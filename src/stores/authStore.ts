import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserRole, OrganizationContext } from '@/types';

interface AuthState {
  user: User | null;
  session: Session | null;
  returnUrl: string | null;
  userRole: UserRole | null;
  isValidAdmin: boolean;
  organizationContext: OrganizationContext | null;
  isInitialized: boolean;
  isValidating: boolean;

  // Computed getters
  isAdmin: boolean;
  isAffiliateManager: boolean;
  isAffiliateMember: boolean;
  isAffiliateUser: boolean;
  isAuthenticated: boolean;
  canAccessAdminRoutes: boolean;
  canManageAffiliates: boolean;
  canViewReports: boolean;
  hasOrganizationAccess: boolean;
}

interface AuthActions {
  initialize: () => Promise<{ success: boolean; user?: User | null; error?: any }>;
  login: (email: string, password: string, requiredRole?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  validateUserInDatabase: () => Promise<void>;
  fetchUserRole: () => Promise<void>;
  setReturnUrl: (url: string | null) => void;
  getDefaultRouteForRole: () => string;

  // Alias for userRole
  role: UserRole | null;

  // Token-based access for policy viewing
  authorizedPolicies: Map<string, { policyId: string; expiresAt: number }>;
  authorizePolicy: (policyId: string) => string;
  getAuthorizedPolicyId: (token: string) => string | null;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      session: null,
      returnUrl: null,
      userRole: null,
      isValidAdmin: false,
      organizationContext: null,
      isInitialized: false,
      isValidating: false,
      authorizedPolicies: new Map(),

      // Computed getters (updated when state changes)
      isAdmin: false,
      isAffiliateManager: false,
      isAffiliateMember: false,
      isAffiliateUser: false,
      isAuthenticated: false,
      canAccessAdminRoutes: false,
      canManageAffiliates: false,
      canViewReports: false,
      hasOrganizationAccess: false,

      // Alias for userRole
      get role() {
        return get().userRole;
      },

      // Actions
      initialize: async () => {
        const state = get();
        if (state.isInitialized) {
          return { success: true, user: state.user };
        }

        try {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();

          if (sessionError) {
            console.error('Session error:', sessionError);
          }

          set({
            session,
            user: session?.user ?? null,
            isAuthenticated: !!session?.user,
          });

          if (session) {
            await get().validateUserInDatabase();
          }

          set({ isInitialized: true });

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (_event, session) => {
            set({
              session,
              user: session?.user ?? null,
              isAuthenticated: !!session?.user,
            });

            if (session) {
              await get().validateUserInDatabase();
            } else {
              set({
                userRole: null,
                isValidAdmin: false,
                organizationContext: null,
                isAdmin: false,
                isAffiliateManager: false,
                isAffiliateMember: false,
                isAffiliateUser: false,
                canAccessAdminRoutes: false,
                canManageAffiliates: false,
                canViewReports: false,
                hasOrganizationAccess: false,
              });
            }
          });

          return { success: true, user: session?.user ?? null };
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ isInitialized: true });
          return { success: false, error };
        }
      },

      validateUserInDatabase: async () => {
        const state = get();
        if (!state.user || state.isValidating) return;

        set({ isValidating: true });

        try {
          // Check if user profile exists and is active
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('status')
            .eq('user_id', state.user.id)
            .single();

          if (profileError) {
            if (profileError.code === 'PGRST116') {
              console.warn('Profile not found for user:', state.user.id);
              set({
                userRole: 'user',
                isValidAdmin: false,
                organizationContext: null,
                isAdmin: false,
                isAffiliateManager: false,
                isAffiliateMember: false,
                isAffiliateUser: false,
                canAccessAdminRoutes: false,
                canManageAffiliates: false,
                canViewReports: false,
                hasOrganizationAccess: false,
                isValidating: false,
              });
              return;
            }
            throw profileError;
          }

          // Check if user is active
          if (profileData?.status !== 'active') {
            console.warn('User account is not active:', profileData?.status);
            await supabase.auth.signOut();
            set({
              user: null,
              session: null,
              userRole: null,
              isValidAdmin: false,
              organizationContext: null,
              isAuthenticated: false,
              isAdmin: false,
              isAffiliateManager: false,
              isAffiliateMember: false,
              isAffiliateUser: false,
              canAccessAdminRoutes: false,
              canManageAffiliates: false,
              canViewReports: false,
              hasOrganizationAccess: false,
              isValidating: false,
            });
            return;
          }

          // Check user role
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', state.user.id)
            .single();

          if (roleError) {
            if (roleError.code === 'PGRST116') {
              set({
                userRole: 'user',
                isValidAdmin: false,
                organizationContext: null,
                isAdmin: false,
                isAffiliateManager: false,
                isAffiliateMember: false,
                isAffiliateUser: false,
                canAccessAdminRoutes: false,
                canManageAffiliates: false,
                canViewReports: false,
                hasOrganizationAccess: false,
                isValidating: false,
              });
              return;
            }
            throw roleError;
          }

          const role = roleData?.role as UserRole;
          const isAdmin = role === 'admin';
          const isAffiliateManager = role === 'affiliate_manager';
          const isAffiliateMember = role === 'affiliate_member';
          const isAffiliateUser = isAffiliateManager || isAffiliateMember;

          set({
            userRole: role,
            isValidAdmin: isAdmin,
            isAdmin,
            isAffiliateManager,
            isAffiliateMember,
            isAffiliateUser,
            canAccessAdminRoutes: isAdmin,
            canManageAffiliates: isAdmin || isAffiliateManager,
            canViewReports: isAdmin || isAffiliateManager,
          });

          // Fetch organization context for affiliate users
          if (isAffiliateUser) {
            const { data: orgMemberData, error: orgError } = await supabase
              .from('organization_members')
              .select(`
                role,
                affiliate_organizations (
                  id,
                  name
                )
              `)
              .eq('user_id', state.user.id)
              .single();

            if (!orgError && orgMemberData?.affiliate_organizations) {
              const org = orgMemberData.affiliate_organizations as any;
              set({
                organizationContext: {
                  organizationId: org.id,
                  organizationName: org.name,
                  userRole: orgMemberData.role as 'affiliate_manager' | 'affiliate_member',
                },
                hasOrganizationAccess: true,
              });
            }
          }

          set({ isValidating: false });
        } catch (error) {
          console.error('Error validating user:', error);
          set({
            userRole: 'user',
            isValidAdmin: false,
            organizationContext: null,
            isAdmin: false,
            isAffiliateManager: false,
            isAffiliateMember: false,
            isAffiliateUser: false,
            canAccessAdminRoutes: false,
            canManageAffiliates: false,
            canViewReports: false,
            hasOrganizationAccess: false,
            isValidating: false,
          });
        }
      },

      login: async (email: string, password: string, requiredRole?: UserRole) => {
        try {
          const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError) throw authError;
          if (!session) throw new Error('No session created');

          // Track login activity
          const now = new Date().toISOString();
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_login_at')
            .eq('user_id', session.user.id)
            .single();

          const isFirstLogin = !profileData?.first_login_at;
          const updateData: Record<string, any> = { last_login_at: now };

          if (isFirstLogin) {
            updateData.first_login_at = now;
            updateData.invite_status = 'active';
          }

          await supabase.from('profiles').update(updateData).eq('user_id', session.user.id);

          set({
            session,
            user: session.user,
            isAuthenticated: true,
          });

          await get().validateUserInDatabase();

          // Check if specific role is required
          if (requiredRole && get().userRole !== requiredRole) {
            throw new Error(`Unauthorized access - ${requiredRole} role required`);
          }

          // Check if user needs to change password
          const userMetadata = session.user.user_metadata;
          if (userMetadata?.requires_password_change) {
            const expiresAt = userMetadata.temp_password_expires;
            if (expiresAt && new Date(expiresAt) < new Date()) {
              await supabase.auth.signOut();
              throw new Error('Temporary password has expired. Please contact your administrator.');
            }
            // Will redirect to change password page
            return;
          }
        } catch (error: any) {
          console.error('Login error:', error);
          throw new Error(error.message || 'Failed to login');
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();

          set({
            user: null,
            session: null,
            userRole: null,
            isValidAdmin: false,
            organizationContext: null,
            isAuthenticated: false,
            isAdmin: false,
            isAffiliateManager: false,
            isAffiliateMember: false,
            isAffiliateUser: false,
            canAccessAdminRoutes: false,
            canManageAffiliates: false,
            canViewReports: false,
            hasOrganizationAccess: false,
            returnUrl: null,
          });

          // Clear session storage
          if (typeof window !== 'undefined') {
            sessionStorage.clear();
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },

      setReturnUrl: (url: string | null) => {
        set({ returnUrl: url });
      },

      // Alias for validateUserInDatabase
      fetchUserRole: async () => {
        await get().validateUserInDatabase();
      },

      getDefaultRouteForRole: () => {
        const state = get();
        switch (state.userRole) {
          case 'admin':
            return '/admin/dashboard';
          case 'affiliate_manager':
            return '/affiliate/manager/dashboard';
          case 'affiliate_member':
            return '/affiliate/member/dashboard';
          default:
            return '/';
        }
      },

      // Token-based access for policy viewing
      authorizePolicy: (policyId: string) => {
        const token = crypto.randomUUID();
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        const authorizedPolicies = new Map(get().authorizedPolicies);
        authorizedPolicies.set(token, { policyId, expiresAt });
        set({ authorizedPolicies });

        return token;
      },

      getAuthorizedPolicyId: (token: string) => {
        const authorizedPolicies = get().authorizedPolicies;
        const access = authorizedPolicies.get(token);

        if (!access) return null;
        if (Date.now() > access.expiresAt) {
          const newMap = new Map(authorizedPolicies);
          newMap.delete(token);
          set({ authorizedPolicies: newMap });
          return null;
        }

        return access.policyId;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        userRole: state.userRole,
        organizationContext: state.organizationContext,
      }),
    }
  )
);


// User roles
export type UserRole = 'admin' | 'affiliate_manager' | 'affiliate_member' | 'user';

// Organization context for affiliate users
export interface OrganizationContext {
  organizationId: string;
  organizationName: string;
  userRole: 'affiliate_manager' | 'affiliate_member';
}

// Policy status
export type PolicyStatus = 'pending' | 'payment_completed' | 'active' | 'cancelled';

// Payment status
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed';

// User status
export type UserStatus = 'active' | 'suspended' | 'deleted';

// Invite status
export type InviteStatus = 'pending' | 'active' | 'expired' | 'resent';

// Document access level
export type DocumentAccessLevel = 'admin' | 'organization' | 'system_wide';

// Fee types
export type FeeType = 'percentage' | 'fixed';
export type FeeEntityType = 'organization' | 'member';

// Quote types
export interface Quote {
  id: string;
  product_code: string;
  user_id?: string;
  organization_id?: string;
  departure_date?: string;
  return_date?: string;
  travelers?: number;
  trip_cost?: number;
  premium?: number;
  departure_city?: string;
  departure_state?: string;
  departure_country?: string;
  destination_city?: string;
  destination_state?: string;
  destination_country?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  expires_at?: string;
  viewed_at?: string;
  emailed_at?: string;
  used: boolean;
  created_at: string;
  modified_at?: string;
}

// Policy types
export interface Policy {
  id: string;
  customer_id?: string;
  quote_id?: string;
  user_id?: string;
  external_policy_id?: string;
  external_certificate?: string;
  document_link?: string;
  payment_intent_id?: string;
  payment_method_id?: string;
  stripe_customer_id?: string;
  paid_amount?: number;
  paid_at?: string;
  currency?: string;
  trip_amount?: number;
  payment_status?: PaymentStatus;
  payment_type?: string;
  payment_error?: string;
  affiliate_id?: string;
  affiliate_user_id?: string;
  status: PolicyStatus;
  created_at: string;
}

// Customer types
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
}

// Affiliate organization types
export interface AffiliateOrganization {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: Record<string, any>;
  first_name?: string;
  last_name?: string;
  affiliate_code?: string;
  external_code_id?: number;
  external_referral_id?: string;
  referred_by_organization_id?: string;
  referred_by_user_id?: string;
  created_by?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Organization member types
export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  sub_affiliate_code?: string;
  created_at: string;
  updated_at: string;
}

// Profile types
export interface Profile {
  id: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  status: UserStatus;
  invite_status: InviteStatus;
  invite_sent_at?: string;
  invite_resend_count: number;
  first_login_at?: string;
  last_login_at?: string;
  reset_token_hash?: string;
  reset_token_expires_at?: string;
  reset_attempts_count: number;
  reset_requested_at?: string;
  deleted_at?: string;
  deleted_by?: string;
  deletion_reason?: string;
  created_at: string;
  updated_at: string;
}

// Program types
export interface Program {
  id: string;
  external_id: number;
  product_code: string;
  product_name: string;
  product_type: string;
  product_sub_type?: string | null;
  retail: number;
  is_percentage: boolean;
  excluded_locations?: Record<string, any> | null;
  sample_document_path?: string | null;
  created_at: string;
  updated_at: string;
}

// Referral fee structure types
export interface ReferralFeeStructure {
  id: string;
  entity_id: string;
  entity_type: FeeEntityType;
  fee_type: FeeType;
  fee_value: number;
  effective_date: string;
  end_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

// Dashboard widget types
export type WidgetSize = 'small' | 'medium' | 'large' | 'full-width';

export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  icon?: React.ComponentType;
  iconColor?: string;
  size: WidgetSize;
  refreshInterval?: number;
  visibility: {
    roles: UserRole[];
    permissions?: string[];
    condition?: (context: any) => boolean;
  };
  position: { row: number; col: number };
  exportable?: boolean;
  customizable?: boolean;
}

export interface DashboardConfig {
  role: UserRole;
  title: string;
  description: string;
  layout: string;
  widgets: WidgetConfig[];
  refreshInterval: number;
  customizable: boolean;
}

// Checkout form types
export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  birthdate: string;
}

export interface AdditionalTraveler {
  firstName: string;
  lastName: string;
  birthdate: string;
  relationship: string;
}

export interface TravelDetails {
  departureCity: string;
  departureState: string;
  departureCountry: string;
  destinationCity: string;
  destinationState: string;
  destinationCountry: string;
  departureDate: string;
  returnDate: string;
  tripAmount: string;
  productCode: string;
  premium: number;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Revenue metrics types
export interface RevenueMetrics {
  total_revenue: number;
  revenue_30d: number;
  total_policies: number;
  policies_30d: number;
}


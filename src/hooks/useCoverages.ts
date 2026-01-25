import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

export interface Coverage {
  id: string;
  customer_id: string | null;
  quote_id: string | null;
  external_policy_id: string | null;
  external_certificate: string | null;
  document_link: string | null;
  paid_amount: number | null;
  paid_at: string | null;
  payment_status: string | null;
  payment_type: string | null;
  status: string;
  affiliate_id: string | null;
  affiliate_user_id: string | null;
  created_at: string;
  customers?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  quotes?: {
    id: string;
    product_code: string;
    departure_date: string | null;
    return_date: string | null;
    departure_city: string | null;
    destination_city: string | null;
    travelers: number | null;
    trip_cost: number | null;
  };
  affiliate_organizations?: {
    id: string;
    name: string;
    affiliate_code: string | null;
  };
}

export function useCoverages() {
  const { userRole, organizationContext, user } = useAuthStore();

  const fetchCoverages = async (): Promise<Coverage[]> => {
    let query = supabase
      .from('policies')
      .select(`
        *,
        customers (*),
        quotes (*),
        affiliate_organizations:affiliate_id (
          id,
          name,
          affiliate_code
        )
      `)
      .order('created_at', { ascending: false });

    // Apply role-based filtering
    if (userRole === 'affiliate_manager' && organizationContext?.organizationId) {
      query = query.eq('affiliate_id', organizationContext.organizationId);
    } else if (userRole === 'affiliate_member' && user?.id) {
      query = query.eq('affiliate_user_id', user.id);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching coverages:', error);
      throw error;
    }

    return (data || []) as Coverage[];
  };

  const {
    data: coverages,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['coverages', userRole, organizationContext?.organizationId, user?.id],
    queryFn: fetchCoverages,
    enabled: !!userRole,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getCoverageById = async (id: string): Promise<Coverage | null> => {
    const { data, error } = await supabase
      .from('policies')
      .select(`
        *,
        customers (*),
        quotes (*),
        affiliate_organizations:affiliate_id (
          id,
          name,
          affiliate_code
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching coverage:', error);
      return null;
    }

    return data as Coverage;
  };

  return {
    coverages,
    isLoading,
    error,
    refetch,
    getCoverageById,
  };
}


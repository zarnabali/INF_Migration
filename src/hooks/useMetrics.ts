import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { RevenueMetrics } from '@/types';

export function useMetrics() {
  const { userRole, organizationContext, user } = useAuthStore();

  const getMetricsParams = () => {
    switch (userRole) {
      case 'admin':
        return { p_affiliate_id: undefined, p_affiliate_user_id: undefined };
      case 'affiliate_manager':
        return {
          p_affiliate_id: organizationContext?.organizationId,
          p_affiliate_user_id: undefined,
        };
      case 'affiliate_member':
        return {
          p_affiliate_id: organizationContext?.organizationId,
          p_affiliate_user_id: user?.id,
        };
      default:
        return { p_affiliate_id: undefined, p_affiliate_user_id: undefined };
    }
  };

  const fetchRevenueMetrics = async (): Promise<RevenueMetrics> => {
    const params = getMetricsParams();

    const { data, error } = await supabase.rpc('get_revenue_metrics', params);

    if (error) {
      console.error('Error fetching revenue metrics:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return {
        total_revenue: 0,
        revenue_30d: 0,
        total_policies: 0,
        policies_30d: 0,
      };
    }

    return data[0];
  };

  const {
    data: metrics,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['revenue-metrics', userRole, organizationContext?.organizationId, user?.id],
    queryFn: fetchRevenueMetrics,
    enabled: !!userRole,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    metrics,
    isLoading,
    error,
    refetch,
  };
}


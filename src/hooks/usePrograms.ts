import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Program } from '@/types';

export function usePrograms() {
  const fetchPrograms = async (): Promise<Program[]> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('product_code', { ascending: true });

    if (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }

    return (data || []) as Program[];
  };

  const {
    data: programs,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['programs'],
    queryFn: fetchPrograms,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  const getProgramByCode = (code: string): Program | undefined => {
    return programs?.find((p) => p.product_code === code);
  };

  const syncPrograms = async () => {
    const { data, error } = await supabase.functions.invoke('get-account-programs');

    if (error) {
      console.error('Error syncing programs:', error);
      throw error;
    }

    await refetch();
    return data;
  };

  return {
    programs,
    isLoading,
    error,
    refetch,
    getProgramByCode,
    syncPrograms,
  };
}


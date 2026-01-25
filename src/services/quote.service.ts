import { supabase } from '@/lib/supabase';

// Types for quotes table
interface QuoteInsert {
  product_code: string;
  departure_date?: string | null;
  return_date?: string | null;
  travelers?: number | null;
  departure_city?: string | null;
  departure_state?: string | null;
  departure_state_abbr?: string | null;
  departure_country?: string | null;
  departure_address?: string | null;
  departure_postalcode?: string | null;
  destination_city?: string | null;
  destination_state?: string | null;
  destination_state_abbr?: string | null;
  destination_country?: string | null;
  destination_address?: string | null;
  destination_postalcode?: string | null;
  trip_cost?: number | null;
  premium?: number | null;
  user_id?: string | null;
  organization_id?: string | null;
  expires_at?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  emailed_at?: string | null;
}

interface Quote extends QuoteInsert {
  id: string;
  created_at: string;
  modified_at: string;
  used: boolean;
  viewed_at?: string | null;
}

export const quoteService = {
  async createQuote(quoteData: QuoteInsert): Promise<Quote | null> {
    const { data, error } = await supabase.from('quotes').insert(quoteData).select('*').single();

    if (error) {
      console.error('Error creating quote:', error);
      throw error;
    }

    return data;
  },

  async getQuoteById(id: string): Promise<Quote | null> {
    const { data, error } = await supabase.from('quotes').select('*').eq('id', id).single();

    if (error) {
      console.error('Error getting quote:', error);
      throw error;
    }

    return data;
  },

  async updateQuote(id: string, updates: Partial<QuoteInsert>): Promise<Quote | null> {
    const { data, error } = await supabase
      .from('quotes')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating quote:', error);
      throw error;
    }

    return data;
  },

  async markQuoteAsUsed(id: string): Promise<void> {
    const { error } = await supabase.from('quotes').update({ used: true }).eq('id', id);

    if (error) {
      console.error('Error marking quote as used:', error);
      throw error;
    }
  },

  async markQuoteAsViewed(id: string): Promise<void> {
    const { error } = await supabase
      .from('quotes')
      .update({ viewed_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error marking quote as viewed:', error);
    }
  },

  async getQuotesByUserId(userId: string): Promise<Quote[]> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting quotes by user ID:', error);
      throw error;
    }

    return data || [];
  },

  async getQuotesByOrganizationId(organizationId: string): Promise<Quote[]> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting quotes by organization ID:', error);
      throw error;
    }

    return data || [];
  },

  async getAllQuotes(): Promise<Quote[]> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting all quotes:', error);
      throw error;
    }

    return data || [];
  },

  async getInsuranceProducts() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('product_name', { ascending: true });

    if (error) {
      console.error('Error fetching insurance products:', error);
      throw error;
    }

    return data || [];
  },
};

// Tab data for quote pages
export const TabsData = {
  traditional: {
    title: 'Single Trip Insurance Plans',
    subtitle: 'Comprehensive coverage options for your individual trips',
  },
  annual: {
    title: 'Annual Multi-Trip Insurance Plans',
    subtitle: 'Protection for multiple trips throughout the year with one simple plan',
  },
};


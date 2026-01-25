import { supabase } from '@/lib/supabase';
import type { ContactInfo, TravelDetails } from '@/types';

type PaymentStatusEnum = 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed';

export interface PolicyPaymentUpdate {
  payment_intent_id?: string;
  status?: PolicyStatus;
  stripe_customer_id?: string;
  payment_method_id?: string;
  paid_at?: string;
  currency?: string;
  payment_status?: PaymentStatusEnum | null;
  payment_error?: string;
  external_policy_id?: string;
  external_certificate?: string;
  document_link?: string;
  paid_amount?: number;
  payment_type?: string;
  affiliate_id?: string;
  affiliate_user_id?: string;
}

type PolicyStatus = 'pending' | 'payment_completed' | 'active' | 'cancelled';

export interface PolicyCreateData {
  policy: {
    trip_amount?: number;
    status?: PolicyStatus;
    payment_type?: string;
    quote_id?: string;
    affiliate_id?: string;
    affiliate_user_id?: string;
  };
  contact_info: ContactInfo;
  travel_details: TravelDetails;
  additional_travelers?: Array<{
    firstName: string;
    lastName: string;
    birthdate: string;
    email?: string;
  }>;
  request_metadata?: Record<string, any>;
}

export interface PolicyDetails {
  id: string;
  externalId?: string;
  externalCertificate?: string;
  document_link?: string;
  contact: ContactInfo;
  travel: TravelDetails;
  additionalTravelers?: any[];
  amount: number;
  status: string;
  createdAt: string;
  paymentType?: string;
  quoteId?: string;
  quote?: {
    id: string;
    departure_date?: string;
    return_date?: string;
    departure_city?: string;
    departure_state?: string;
    departure_country?: string;
    destination_city?: string;
    destination_state?: string;
    destination_country?: string;
    travelers?: number;
    trip_cost?: number;
    product_code?: string;
    program?: {
      product_code: string;
      product_name: string;
    };
  };
  affiliateOrganization?: {
    id: string;
    name: string;
    affiliate_code: string;
    email?: string;
    phone?: string;
  };
  affiliateUser?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    user_id: string | null;
  };
  paidAmount?: number;
  customer?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
}

export const apiService = {
  async createPaymentIntent(
    amount: number,
    options?: {
      capture_method?: 'manual' | 'automatic';
      payment_method_type?: 'credit' | 'affirm';
    },
    currency: string = 'usd'
  ) {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: { amount, currency, ...options },
    });

    if (error) {
      console.error('Payment intent creation failed:', error);
      throw new Error('Failed to initialize payment. Please try again.');
    }
    return data as { clientSecret: string; paymentIntentId: string };
  },

  async createPolicyRecord({
    policy,
    contact_info,
    travel_details,
    additional_travelers,
    request_metadata,
  }: PolicyCreateData) {
    // First create or get existing customer
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .upsert(
        {
          first_name: contact_info.firstName,
          last_name: contact_info.lastName,
          email: contact_info.email,
          phone: contact_info.phone,
        },
        {
          onConflict: 'email, first_name, last_name',
        }
      )
      .select()
      .single();

    if (customerError) throw new Error(customerError.message);

    // Create policy with customer_id
    const { data: policyData, error: policyError } = await supabase
      .from('policies')
      .insert({
        ...policy,
        customer_id: customerData.id,
      })
      .select()
      .single();

    if (policyError) throw new Error(policyError.message);

    // Create request details
    const { error: detailsError } = await supabase.from('request_details').insert({
      policy_id: policyData.id,
      contact_info: {
        address: contact_info.address,
        city: contact_info.city,
        state: contact_info.state,
        postal: contact_info.postal,
        country: contact_info.country,
        birthdate: contact_info.birthdate,
      } as any,
      travel_details: travel_details as any,
      additional_travelers: (additional_travelers || []) as any,
      ...request_metadata,
    });

    if (detailsError) {
      console.error('Error creating request details:', detailsError);
    }

    return policyData;
  },

  async updatePolicyPayment(policyId: string, updates: PolicyPaymentUpdate) {
    const { data, error } = await supabase
      .from('policies')
      .update(updates)
      .eq('id', policyId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async capturePayment(paymentIntentId: string) {
    const { data, error } = await supabase.functions.invoke('capture-payment', {
      body: { paymentIntentId },
    });

    if (error) {
      console.error('Payment capture failed:', error);
      throw new Error('Failed to capture payment');
    }
    return data;
  },

  async cancelPayment(paymentIntentId: string) {
    const { data, error } = await supabase.functions.invoke('cancel-payment', {
      body: { paymentIntentId },
    });

    if (error) {
      console.error('Payment cancellation failed:', error);
      throw new Error('Failed to cancel payment');
    }
    return data;
  },

  async openInsurancePolicy(data: {
    contact: ContactInfo;
    travel: TravelDetails;
    amount: number;
    reservationNumber: string;
    paymentType: string;
    paymentIntentId: string;
    productCode: string;
    additionalTravelers?: any[];
    referralCode?: string;
  }) {
    const { data: response, error } = await supabase.functions.invoke('open-insurance-policy', {
      body: data,
    });

    if (error) {
      console.error('Insurance policy creation failed:', error);
      throw new Error('Failed to create insurance policy');
    }
    return response;
  },

  async getPolicyDetails(policyId: string): Promise<PolicyDetails | null> {
    const { data, error } = await supabase
      .from('policies')
      .select(`
        *,
        customers (*),
        quotes (*),
        request_details (*),
        affiliate_organizations:affiliate_id (
          id,
          name,
          affiliate_code,
          email,
          phone
        )
      `)
      .eq('id', policyId)
      .single();

    if (error) {
      console.error('Error fetching policy details:', error);
      return null;
    }

    const requestDetails = data.request_details as any;
    const customer = data.customers as any;
    const quote = data.quotes as any;

    return {
      id: data.id,
      externalId: data.external_policy_id ?? undefined,
      externalCertificate: data.external_certificate ?? undefined,
      document_link: data.document_link ?? undefined,
      contact: {
        firstName: customer?.first_name || '',
        lastName: customer?.last_name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        address: requestDetails?.contact_info?.address || '',
        city: requestDetails?.contact_info?.city || '',
        state: requestDetails?.contact_info?.state || '',
        postal: requestDetails?.contact_info?.postal || '',
        country: requestDetails?.contact_info?.country || '',
        birthdate: requestDetails?.contact_info?.birthdate || '',
      },
      travel: requestDetails?.travel_details || {
        departureCity: quote?.departure_city || '',
        departureState: quote?.departure_state || '',
        departureCountry: quote?.departure_country || '',
        destinationCity: quote?.destination_city || '',
        destinationState: quote?.destination_state || '',
        destinationCountry: quote?.destination_country || '',
        departureDate: quote?.departure_date || '',
        returnDate: quote?.return_date || '',
        tripAmount: String(quote?.trip_cost || '0'),
        productCode: quote?.product_code || '',
        premium: quote?.premium || 0,
      },
      additionalTravelers: requestDetails?.additional_travelers || [],
      amount: data.paid_amount || data.trip_amount || 0,
      status: data.status,
      createdAt: data.created_at,
      paymentType: data.payment_type ?? undefined,
      quoteId: data.quote_id ?? undefined,
      quote: quote ? {
        id: quote.id,
        departure_date: quote.departure_date,
        return_date: quote.return_date,
        departure_city: quote.departure_city,
        departure_state: quote.departure_state,
        departure_country: quote.departure_country,
        destination_city: quote.destination_city,
        destination_state: quote.destination_state,
        destination_country: quote.destination_country,
        travelers: quote.travelers,
        trip_cost: quote.trip_cost,
        product_code: quote.product_code,
      } : undefined,
      affiliateOrganization: data.affiliate_organizations as any,
      paidAmount: data.paid_amount ?? undefined,
      customer: customer ? {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
      } : undefined,
    };
  },

  async sanitizePolicyTravelerData(policyId: string) {
    const { error } = await supabase
      .from('request_details')
      .update({
        additional_travelers: null,
        contact_info: null,
      })
      .eq('policy_id', policyId);

    if (error) {
      console.error('Error sanitizing policy data:', error);
    }
  },

  async getCoverage(id: string) {
    const { data, error } = await supabase
      .from('policies')
      .select(`
        *,
        customers (first_name, last_name, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching coverage:', error);
      return null;
    }

    // Fetch quote details for dates and product info
    let quoteData = null;
    let programData = null;
    if (data.quote_id) {
      const { data: quote } = await supabase
        .from('quotes')
        .select('departure_date, return_date, product_code, travelers, destination_city, destination_country')
        .eq('id', data.quote_id)
        .single();
      quoteData = quote;

      if (quote?.product_code) {
        const { data: program } = await supabase
          .from('programs')
          .select('product_name, product_code, product_type')
          .eq('product_code', quote.product_code)
          .single();
        programData = program;
      }
    }

    return {
      id: data.id,
      status: data.status,
      premium: data.paid_amount || data.trip_amount,
      start_date: quoteData?.departure_date || null,
      end_date: quoteData?.return_date || null,
      created_at: data.created_at,
      customer_name: `${data.customers?.first_name || ''} ${data.customers?.last_name || ''}`,
      customer_email: data.customers?.email,
      product_name: programData?.product_name || null,
      product_code: programData?.product_code || null,
      product_type: programData?.product_type || null,
      destination: quoteData?.destination_city ? `${quoteData.destination_city}, ${quoteData.destination_country}` : null,
      travelers: quoteData?.travelers || 1,
      payment_status: data.payment_status,
    };
  },

  async cancelCoverage(id: string, _reason: string) {
    const { error } = await supabase
      .from('policies')
      .update({
        status: 'cancelled' as const,
      })
      .eq('id', id);

    if (error) {
      console.error('Error cancelling coverage:', error);
      throw error;
    }
  },

  async sendContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    const { error } = await supabase.functions.invoke('send-contact-email', {
      body: data,
    });

    if (error) {
      console.error('Error sending contact form:', error);
      throw new Error('Failed to send message');
    }
  },

  async registerReferralPartner(data: {
    organizationName: string;
    contactName: string;
    email: string;
    phone?: string;
    website?: string;
    businessType?: string;
    message?: string;
  }) {
    const { error } = await supabase.functions.invoke('register-referral-partner', {
      body: data,
    });

    if (error) {
      console.error('Error registering referral partner:', error);
      throw new Error('Failed to submit application');
    }
  },

  async forgotPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/change-password`,
    });

    if (error) {
      console.error('Error sending reset password email:', error);
      throw error;
    }
  },

  async verifyResetToken(token: string) {
    // Token verification is handled by Supabase automatically
    return { valid: true };
  },

  async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    organizationId?: string;
  }) {
    const { data, error } = await supabase.functions.invoke('create-user', {
      body: userData,
    });

    if (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }

    return data;
  },

  async resendInvite(userId: string) {
    const { data, error } = await supabase.functions.invoke('resend-invite', {
      body: { userId },
    });

    if (error) {
      console.error('Error resending invite:', error);
      throw new Error('Failed to resend invite');
    }

    return data;
  },

  async sendQuoteEmail(quoteId: string, email: string) {
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: { quoteId, email },
    });

    if (error) {
      console.error('Error sending quote email:', error);
      throw new Error('Failed to send quote email');
    }

    return data;
  },

  async getAccountPrograms(_organizationId: string) {
    // Note: affiliate_programs table doesn't exist in schema
    // Returning all active programs for now
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('product_name', { ascending: true });

    if (error) {
      console.error('Error fetching account programs:', error);
      throw error;
    }

    return data || [];
  },
};


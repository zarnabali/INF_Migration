import { supabase } from '@/lib/supabase';

interface ReferralValidationResult {
  is_valid: boolean;
  organization_id: string | null;
  organization_name: string | null;
  code: string | null;
}

export const referralService = {
  async validateReferralCode(code?: string | null): Promise<ReferralValidationResult> {
    if (!code) {
      // Return default organization (if exists)
      const { data } = await supabase
        .from('affiliate_organizations')
        .select('id, name, affiliate_code')
        .eq('is_default', true)
        .single();

      if (data) {
        return {
          is_valid: true,
          organization_id: data.id,
          organization_name: data.name,
          code: data.affiliate_code,
        };
      }

      return {
        is_valid: false,
        organization_id: null,
        organization_name: null,
        code: null,
      };
    }

    // Validate the provided code
    const { data, error } = await supabase.rpc('validate_referral_code_public', {
      p_code: code,
    });

    if (error || !data || data.length === 0) {
      return {
        is_valid: false,
        organization_id: null,
        organization_name: null,
        code: null,
      };
    }

    const result = data[0];
    return {
      is_valid: result.is_valid,
      organization_id: result.organization_id,
      organization_name: result.organization_name,
      code: result.code,
    };
  },

  async getAffiliateCodesFromQuote(
    organizationId?: string | null,
    userId?: string | null
  ): Promise<{ code: string | null; code_type: string | null }> {
    if (!organizationId) {
      return { code: null, code_type: null };
    }

    const { data, error } = await supabase.rpc('get_affiliate_codes_from_quote', {
      p_organization_id: organizationId,
      p_user_id: userId || undefined,
    });

    if (error || !data || data.length === 0) {
      return { code: null, code_type: null };
    }

    return {
      code: data[0].code,
      code_type: data[0].code_type,
    };
  },

  async registerReferralPartner(data: {
    organizationId: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    const { data: response, error } = await supabase.functions.invoke('register-referral-partner', {
      body: data,
    });

    if (error) {
      console.error('Error registering referral partner:', error);
      throw new Error('Failed to register referral partner');
    }

    return response;
  },

  async registerReferralCode(organizationId: string) {
    const { data: response, error } = await supabase.functions.invoke('register-referral-code', {
      body: { organizationId },
    });

    if (error) {
      console.error('Error registering referral code:', error);
      throw new Error('Failed to register referral code');
    }

    return response;
  },

  async updateReferralCode(organizationId: string, feeData: any) {
    const { data: response, error } = await supabase.functions.invoke('update-referral-code', {
      body: { organizationId, ...feeData },
    });

    if (error) {
      console.error('Error updating referral code:', error);
      throw new Error('Failed to update referral code');
    }

    return response;
  },
};


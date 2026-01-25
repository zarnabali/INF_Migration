export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      affiliate_organizations: {
        Row: {
          address: Json | null;
          affiliate_code: string | null;
          created_at: string;
          created_by: string | null;
          email: string;
          external_code_id: number | null;
          external_referral_id: string | null;
          first_name: string | null;
          id: string;
          is_default: boolean;
          last_name: string | null;
          name: string;
          phone: string | null;
          referred_by_organization_id: string | null;
          referred_by_user_id: string | null;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          address?: Json | null;
          affiliate_code?: string | null;
          created_at?: string;
          created_by?: string | null;
          email: string;
          external_code_id?: number | null;
          external_referral_id?: string | null;
          first_name?: string | null;
          id?: string;
          is_default?: boolean;
          last_name?: string | null;
          name: string;
          phone?: string | null;
          referred_by_organization_id?: string | null;
          referred_by_user_id?: string | null;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          address?: Json | null;
          affiliate_code?: string | null;
          created_at?: string;
          created_by?: string | null;
          email?: string;
          external_code_id?: number | null;
          external_referral_id?: string | null;
          first_name?: string | null;
          id?: string;
          is_default?: boolean;
          last_name?: string | null;
          name?: string;
          phone?: string | null;
          referred_by_organization_id?: string | null;
          referred_by_user_id?: string | null;
          updated_at?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'affiliate_organizations_referred_by_organization_id_fkey';
            columns: ['referred_by_organization_id'];
            isOneToOne: false;
            referencedRelation: 'affiliate_organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      claims: {
        Row: {
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          policy_id: string;
          reason: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          policy_id: string;
          reason: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          policy_id?: string;
          reason?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'claims_policy_id_fkey';
            columns: ['policy_id'];
            isOneToOne: false;
            referencedRelation: 'policies';
            referencedColumns: ['id'];
          },
        ];
      };
      country_codes: {
        Row: {
          country_name: string;
          created_at: string;
          id: string;
          iso_code: string;
        };
        Insert: {
          country_name: string;
          created_at?: string;
          id?: string;
          iso_code: string;
        };
        Update: {
          country_name?: string;
          created_at?: string;
          id?: string;
          iso_code?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          phone: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone?: string;
        };
        Relationships: [];
      };
      organization_documents: {
        Row: {
          access_level: Database['public']['Enums']['document_access_level'];
          created_at: string | null;
          description: string | null;
          file_path: string;
          file_size: number | null;
          id: string;
          mime_type: string | null;
          name: string;
          organization_id: string;
          updated_at: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          access_level?: Database['public']['Enums']['document_access_level'];
          created_at?: string | null;
          description?: string | null;
          file_path: string;
          file_size?: number | null;
          id?: string;
          mime_type?: string | null;
          name: string;
          organization_id: string;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          access_level?: Database['public']['Enums']['document_access_level'];
          created_at?: string | null;
          description?: string | null;
          file_path?: string;
          file_size?: number | null;
          id?: string;
          mime_type?: string | null;
          name?: string;
          organization_id?: string;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'organization_documents_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'affiliate_organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      organization_members: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string;
          role: Database['public']['Enums']['user_role'];
          sub_affiliate_code: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id: string;
          role: Database['public']['Enums']['user_role'];
          sub_affiliate_code?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string;
          role?: Database['public']['Enums']['user_role'];
          sub_affiliate_code?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organization_members_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'affiliate_organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      policies: {
        Row: {
          affiliate_id: string | null;
          affiliate_user_id: string | null;
          created_at: string;
          currency: string | null;
          customer_id: string | null;
          document_link: string | null;
          external_certificate: string | null;
          external_policy_id: string | null;
          id: string;
          paid_amount: number | null;
          paid_at: string | null;
          payment_error: string | null;
          payment_intent_id: string | null;
          payment_method_id: string | null;
          payment_status: Database['public']['Enums']['payment_status_enum'] | null;
          payment_type: string | null;
          quote_id: string | null;
          status: Database['public']['Enums']['policy_status'];
          stripe_customer_id: string | null;
          trip_amount: number | null;
          user_id: string | null;
        };
        Insert: {
          affiliate_id?: string | null;
          affiliate_user_id?: string | null;
          created_at?: string;
          currency?: string | null;
          customer_id?: string | null;
          document_link?: string | null;
          external_certificate?: string | null;
          external_policy_id?: string | null;
          id?: string;
          paid_amount?: number | null;
          paid_at?: string | null;
          payment_error?: string | null;
          payment_intent_id?: string | null;
          payment_method_id?: string | null;
          payment_status?: Database['public']['Enums']['payment_status_enum'] | null;
          payment_type?: string | null;
          quote_id?: string | null;
          status?: Database['public']['Enums']['policy_status'];
          stripe_customer_id?: string | null;
          trip_amount?: number | null;
          user_id?: string | null;
        };
        Update: {
          affiliate_id?: string | null;
          affiliate_user_id?: string | null;
          created_at?: string;
          currency?: string | null;
          customer_id?: string | null;
          document_link?: string | null;
          external_certificate?: string | null;
          external_policy_id?: string | null;
          id?: string;
          paid_amount?: number | null;
          paid_at?: string | null;
          payment_error?: string | null;
          payment_intent_id?: string | null;
          payment_method_id?: string | null;
          payment_status?: Database['public']['Enums']['payment_status_enum'] | null;
          payment_type?: string | null;
          quote_id?: string | null;
          status?: Database['public']['Enums']['policy_status'];
          stripe_customer_id?: string | null;
          trip_amount?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'policies_affiliate_id_fkey';
            columns: ['affiliate_id'];
            isOneToOne: false;
            referencedRelation: 'affiliate_organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'policies_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'policies_quote_id_fkey';
            columns: ['quote_id'];
            isOneToOne: false;
            referencedRelation: 'quotes';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          deletion_reason: string | null;
          first_login_at: string | null;
          first_name: string | null;
          id: string;
          invite_resend_count: number;
          invite_sent_at: string | null;
          invite_status: Database['public']['Enums']['invite_status'];
          last_login_at: string | null;
          last_name: string | null;
          reset_attempts_count: number;
          reset_requested_at: string | null;
          reset_token_expires_at: string | null;
          reset_token_hash: string | null;
          status: Database['public']['Enums']['user_status'];
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          deletion_reason?: string | null;
          first_login_at?: string | null;
          first_name?: string | null;
          id?: string;
          invite_resend_count?: number;
          invite_sent_at?: string | null;
          invite_status?: Database['public']['Enums']['invite_status'];
          last_login_at?: string | null;
          last_name?: string | null;
          reset_attempts_count?: number;
          reset_requested_at?: string | null;
          reset_token_expires_at?: string | null;
          reset_token_hash?: string | null;
          status?: Database['public']['Enums']['user_status'];
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          deletion_reason?: string | null;
          first_login_at?: string | null;
          first_name?: string | null;
          id?: string;
          invite_resend_count?: number;
          invite_sent_at?: string | null;
          invite_status?: Database['public']['Enums']['invite_status'];
          last_login_at?: string | null;
          last_name?: string | null;
          reset_attempts_count?: number;
          reset_requested_at?: string | null;
          reset_token_expires_at?: string | null;
          reset_token_hash?: string | null;
          status?: Database['public']['Enums']['user_status'];
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          created_at: string;
          excluded_locations: Json | null;
          external_id: number;
          id: string;
          is_percentage: boolean;
          product_code: string;
          product_name: string;
          product_sub_type: string;
          product_type: string;
          retail: number;
          sample_document_path: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          excluded_locations?: Json | null;
          external_id: number;
          id?: string;
          is_percentage: boolean;
          product_code: string;
          product_name: string;
          product_sub_type?: string;
          product_type: string;
          retail: number;
          sample_document_path?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          excluded_locations?: Json | null;
          external_id?: number;
          id?: string;
          is_percentage?: boolean;
          product_code?: string;
          product_name?: string;
          product_sub_type?: string;
          product_type?: string;
          retail?: number;
          sample_document_path?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      quotes: {
        Row: {
          created_at: string;
          departure_address: string | null;
          departure_city: string | null;
          departure_country: string | null;
          departure_date: string | null;
          departure_postalcode: string | null;
          departure_state: string | null;
          departure_state_abbr: string | null;
          destination_address: string | null;
          destination_city: string | null;
          destination_country: string | null;
          destination_postalcode: string | null;
          destination_state: string | null;
          destination_state_abbr: string | null;
          email: string | null;
          emailed_at: string | null;
          expires_at: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          modified_at: string;
          organization_id: string | null;
          premium: number | null;
          product_code: string;
          return_date: string | null;
          travelers: number | null;
          trip_cost: number | null;
          used: boolean;
          user_id: string | null;
          viewed_at: string | null;
        };
        Insert: {
          created_at?: string;
          departure_address?: string | null;
          departure_city?: string | null;
          departure_country?: string | null;
          departure_date?: string | null;
          departure_postalcode?: string | null;
          departure_state?: string | null;
          departure_state_abbr?: string | null;
          destination_address?: string | null;
          destination_city?: string | null;
          destination_country?: string | null;
          destination_postalcode?: string | null;
          destination_state?: string | null;
          destination_state_abbr?: string | null;
          email?: string | null;
          emailed_at?: string | null;
          expires_at?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          modified_at?: string;
          organization_id?: string | null;
          premium?: number | null;
          product_code: string;
          return_date?: string | null;
          travelers?: number | null;
          trip_cost?: number | null;
          used?: boolean;
          user_id?: string | null;
          viewed_at?: string | null;
        };
        Update: {
          created_at?: string;
          departure_address?: string | null;
          departure_city?: string | null;
          departure_country?: string | null;
          departure_date?: string | null;
          departure_postalcode?: string | null;
          departure_state?: string | null;
          departure_state_abbr?: string | null;
          destination_address?: string | null;
          destination_city?: string | null;
          destination_country?: string | null;
          destination_postalcode?: string | null;
          destination_state?: string | null;
          destination_state_abbr?: string | null;
          email?: string | null;
          emailed_at?: string | null;
          expires_at?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          modified_at?: string;
          organization_id?: string | null;
          premium?: number | null;
          product_code?: string;
          return_date?: string | null;
          travelers?: number | null;
          trip_cost?: number | null;
          used?: boolean;
          user_id?: string | null;
          viewed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'quotes_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'affiliate_organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      referral_fee_structures: {
        Row: {
          created_at: string;
          created_by: string | null;
          effective_date: string;
          end_date: string | null;
          entity_id: string;
          entity_type: Database['public']['Enums']['fee_entity_type_enum'];
          fee_type: Database['public']['Enums']['fee_type_enum'];
          fee_value: number;
          id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          effective_date?: string;
          end_date?: string | null;
          entity_id: string;
          entity_type: Database['public']['Enums']['fee_entity_type_enum'];
          fee_type: Database['public']['Enums']['fee_type_enum'];
          fee_value: number;
          id?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          effective_date?: string;
          end_date?: string | null;
          entity_id?: string;
          entity_type?: Database['public']['Enums']['fee_entity_type_enum'];
          fee_type?: Database['public']['Enums']['fee_type_enum'];
          fee_value?: number;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      request_details: {
        Row: {
          additional_travelers: Json | null;
          contact_info: Json | null;
          created_at: string;
          id: string;
          ip_address: string | null;
          policy_id: string;
          request_headers: Json | null;
          request_metadata: Json | null;
          travel_details: Json | null;
          user_agent: string | null;
        };
        Insert: {
          additional_travelers?: Json | null;
          contact_info?: Json | null;
          created_at?: string;
          id?: string;
          ip_address?: string | null;
          policy_id: string;
          request_headers?: Json | null;
          request_metadata?: Json | null;
          travel_details?: Json | null;
          user_agent?: string | null;
        };
        Update: {
          additional_travelers?: Json | null;
          contact_info?: Json | null;
          created_at?: string;
          id?: string;
          ip_address?: string | null;
          policy_id?: string;
          request_headers?: Json | null;
          request_metadata?: Json | null;
          travel_details?: Json | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'request_details_policy_id_fkey';
            columns: ['policy_id'];
            isOneToOne: true;
            referencedRelation: 'policies';
            referencedColumns: ['id'];
          },
        ];
      };
      system_documents: {
        Row: {
          access_level: Database['public']['Enums']['document_access_level'];
          created_at: string | null;
          description: string | null;
          file_path: string;
          file_size: number | null;
          id: string;
          mime_type: string | null;
          name: string;
          updated_at: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          access_level?: Database['public']['Enums']['document_access_level'];
          created_at?: string | null;
          description?: string | null;
          file_path: string;
          file_size?: number | null;
          id?: string;
          mime_type?: string | null;
          name: string;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          access_level?: Database['public']['Enums']['document_access_level'];
          created_at?: string | null;
          description?: string | null;
          file_path?: string;
          file_size?: number | null;
          id?: string;
          mime_type?: string | null;
          name?: string;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database['public']['Enums']['user_role'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_active_referral_fee: {
        Args: {
          p_entity_id: string;
          p_entity_type: Database['public']['Enums']['fee_entity_type_enum'];
        };
        Returns: {
          fee_type: Database['public']['Enums']['fee_type_enum'];
          fee_value: number;
          effective_date: string;
        }[];
      };
      get_admin_users: {
        Args: Record<PropertyKey, never>;
        Returns: {
          user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          status: Database['public']['Enums']['user_status'];
          invite_status: Database['public']['Enums']['invite_status'];
          invite_sent_at: string;
          invite_resend_count: number;
          first_login_at: string;
          last_login_at: string;
          created_at: string;
        }[];
      };
      get_affiliate_codes_from_quote: {
        Args: {
          p_organization_id: string;
          p_user_id?: string;
        };
        Returns: {
          code: string;
          code_type: string;
        }[];
      };
      get_all_admin_users: {
        Args: Record<PropertyKey, never>;
        Returns: {
          user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          status: Database['public']['Enums']['user_status'];
          invite_status: Database['public']['Enums']['invite_status'];
          invite_sent_at: string;
          invite_resend_count: number;
          first_login_at: string;
          last_login_at: string;
          created_at: string;
          deleted_at: string;
          deleted_by: string;
          deletion_reason: string;
        }[];
      };
      get_all_organization_members: {
        Args: {
          org_id: string;
        };
        Returns: {
          user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          role: Database['public']['Enums']['user_role'];
          sub_affiliate_code: string;
          status: Database['public']['Enums']['user_status'];
          invite_status: Database['public']['Enums']['invite_status'];
          invite_sent_at: string;
          invite_resend_count: number;
          first_login_at: string;
          last_login_at: string;
          created_at: string;
          deleted_at: string;
          deleted_by: string;
          deletion_reason: string;
        }[];
      };
      get_organization_members: {
        Args: {
          org_id: string;
        };
        Returns: {
          user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          role: Database['public']['Enums']['user_role'];
          sub_affiliate_code: string;
          status: Database['public']['Enums']['user_status'];
          invite_status: Database['public']['Enums']['invite_status'];
          invite_sent_at: string;
          invite_resend_count: number;
          first_login_at: string;
          last_login_at: string;
          created_at: string;
        }[];
      };
      get_revenue_metrics: {
        Args: {
          p_affiliate_id?: string;
          p_affiliate_user_id?: string;
        };
        Returns: {
          total_revenue: number;
          revenue_30d: number;
          total_policies: number;
          policies_30d: number;
        }[];
      };
      get_user_role: {
        Args: {
          user_id: string;
        };
        Returns: Database['public']['Enums']['user_role'];
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_affiliate_manager_for_org: {
        Args: {
          org_id: string;
        };
        Returns: boolean;
      };
      validate_referral_code_public: {
        Args: {
          p_code: string;
        };
        Returns: {
          is_valid: boolean;
          organization_id: string;
          organization_name: string;
          code: string;
        }[];
      };
    };
    Enums: {
      document_access_level: 'admin' | 'organization' | 'system_wide';
      fee_entity_type_enum: 'organization' | 'member';
      fee_type_enum: 'percentage' | 'fixed';
      invite_status: 'pending' | 'active' | 'expired' | 'resent';
      payment_status_enum: 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed';
      policy_status: 'pending' | 'payment_completed' | 'active' | 'cancelled';
      user_role: 'admin' | 'affiliate_manager' | 'affiliate_member';
      user_status: 'active' | 'suspended' | 'deleted';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;


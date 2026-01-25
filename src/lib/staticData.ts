/**
 * Static/Mock Data for Development Mode
 * This allows the frontend to run without a backend connection
 */

export const isStaticMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co';

// Mock Programs Data
export const mockPrograms = [
  {
    id: '1',
    product_code: 'SINGLE-TRIP-BASIC',
    product_name: 'Single Trip Basic',
    product_type: 'single_trip',
    product_sub_type: 'basic',
    retail: 49.99,
    is_percentage: false,
    external_id: 1001,
    sample_document_path: null,
    excluded_locations: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    product_code: 'SINGLE-TRIP-PREMIUM',
    product_name: 'Single Trip Premium',
    product_type: 'single_trip',
    product_sub_type: 'premium',
    retail: 99.99,
    is_percentage: false,
    external_id: 1002,
    sample_document_path: null,
    excluded_locations: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    product_code: 'ANNUAL-INDIVIDUAL',
    product_name: 'Annual Individual Plan',
    product_type: 'annual',
    product_sub_type: 'individual',
    retail: 199.99,
    is_percentage: false,
    external_id: 2001,
    sample_document_path: null,
    excluded_locations: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    product_code: 'ANNUAL-GROUP',
    product_name: 'Annual Group Plan',
    product_type: 'annual',
    product_sub_type: 'group',
    retail: 149.99,
    is_percentage: false,
    external_id: 2002,
    sample_document_path: null,
    excluded_locations: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Mock Quotes Data
export const mockQuotes = [
  {
    id: 'quote-1',
    product_code: 'SINGLE-TRIP-BASIC',
    departure_date: '2024-06-01',
    return_date: '2024-06-15',
    travelers: 2,
    departure_city: 'New York',
    departure_state: 'New York',
    departure_state_abbr: 'NY',
    departure_country: 'USA',
    destination_city: 'Paris',
    destination_country: 'France',
    trip_cost: 5000,
    premium: 149.99,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    created_at: '2024-01-15T10:00:00Z',
    modified_at: '2024-01-15T10:00:00Z',
    used: false,
    viewed_at: null,
    expires_at: '2024-02-15T10:00:00Z',
  },
];

// Mock Coverages/Policies Data
export const mockPolicies = [
  {
    id: 'policy-1',
    customer_id: 'customer-1',
    quote_id: 'quote-1',
    status: 'active',
    paid_amount: 149.99,
    payment_status: 'paid',
    created_at: '2024-01-20T10:00:00Z',
    external_certificate: 'CERT-2024-001',
    customers: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    },
  },
];

// Mock Affiliates Data
export const mockAffiliates = [
  {
    id: 'affiliate-1',
    name: 'Travel Partners Inc',
    affiliate_code: 'TPI-001',
    email: 'contact@travelpartners.com',
    phone: '555-0100',
    website: 'https://travelpartners.com',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    address: {
      street: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    },
  },
];

// Mock Users Data
export const mockUsers = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  },
];

// Mock Dashboard Metrics
export const mockMetrics = {
  totalPolicies: 156,
  totalRevenue: 45250.00,
  activeQuotes: 23,
  conversionRate: 12.5,
  policiesTrend: 8.2,
  revenueTrend: 15.3,
};

// Helper function to get mock data based on entity type
export function getMockData<T>(entity: string): T[] {
  switch (entity) {
    case 'programs':
      return mockPrograms as T[];
    case 'quotes':
      return mockQuotes as T[];
    case 'policies':
      return mockPolicies as T[];
    case 'affiliates':
      return mockAffiliates as T[];
    case 'users':
      return mockUsers as T[];
    default:
      return [];
  }
}

// Helper to simulate async data fetching
export async function fetchMockData<T>(entity: string, delay = 500): Promise<T[]> {
  if (!isStaticMode) {
    throw new Error('Mock data should only be used in static mode');
  }
  
  await new Promise(resolve => setTimeout(resolve, delay));
  return getMockData<T>(entity);
}

// Helper to get a single mock item by ID
export function getMockItemById<T extends { id: string }>(
  entity: string,
  id: string
): T | undefined {
  const data = getMockData<T>(entity);
  return data.find(item => item.id === id);
}


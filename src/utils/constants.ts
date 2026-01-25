// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  AFFILIATE_MANAGER: 'affiliate_manager',
  AFFILIATE_MEMBER: 'affiliate_member',
  USER: 'user',
} as const;

// Policy statuses
export const POLICY_STATUS = {
  PENDING: 'pending',
  PAYMENT_COMPLETED: 'payment_completed',
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// Payment statuses
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

// Quote statuses
export const QUOTE_STATUS = {
  PENDING: 'pending',
  VIEWED: 'viewed',
  CONVERTED: 'converted',
  EXPIRED: 'expired',
} as const;

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit',
  AFFIRM: 'affirm',
} as const;

// Product types
export const PRODUCT_TYPES = {
  SINGLE_TRIP: 'single_trip',
  ANNUAL_INDIVIDUAL: 'annual_individual',
  ANNUAL_GROUP: 'annual_group',
} as const;

// US States
export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' },
];

// Countries
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IN', name: 'India' },
];

// Document categories
export const DOCUMENT_CATEGORIES = [
  { id: 'policy', label: 'Policy Documents' },
  { id: 'brochure', label: 'Brochures' },
  { id: 'marketing', label: 'Marketing Materials' },
  { id: 'legal', label: 'Legal Documents' },
  { id: 'other', label: 'Other' },
];

// Status colors for UI
export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  expired: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  processing: 'bg-blue-100 text-blue-800',
  viewed: 'bg-blue-100 text-blue-800',
  converted: 'bg-green-100 text-green-800',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// API endpoints
export const API_ENDPOINTS = {
  POLICIES: '/policies',
  QUOTES: '/quotes',
  CUSTOMERS: '/customers',
  PROGRAMS: '/programs',
  AFFILIATES: '/affiliate_organizations',
  USERS: '/profiles',
} as const;


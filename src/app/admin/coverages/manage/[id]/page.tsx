'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts';
import Link from 'next/link';
import {
  IconChevronRight,
  IconShieldCheck,
  IconCreditCard,
  IconDownload,
  IconSettings,
  IconUser,
  IconPlane,
  IconUsers,
  IconBuilding,
  IconAlertCircle
} from '@tabler/icons-react'; // Using Tabler icons as mapped from MDI
import { useParams } from 'next/navigation';

export default function ManageCoveragePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('information');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetch with expanded data matching Vue structure
    setTimeout(() => {
      setData({
        id: params.id,
        certificate: 'MIG-12345678',
        externalCertificate: 'MIG-12345678',
        status: 'active',
        externalId: 'EXT-998877',
        program: {
          product_name: 'Travel Protector Essentials',
          product_code: 'TPE-2024'
        },
        created: '2025-01-15T10:00:00Z',
        amount: 18550, // cents
        currency: 'USD',
        paymentType: 'Credit Card',
        paymentDate: '2025-01-15T10:05:00Z',
        paymentStatus: 'paid',
        paymentMethod: 'Visa ending 4242',
        customer: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, New York, NY 10001'
        },
        trip: {
          departure: { city: 'New York', state: 'NY', country: 'USA', date: '2025-01-20' },
          destination: { city: 'Paris', state: '', country: 'France', date: '2025-02-10' },
          return_date: '2025-02-10',
          travelers: 2,
          tripCost: 250000 // cents
        },
        additionalTravelers: [
          { firstName: 'Jane', lastName: 'Doe', birthDate: '1990-05-15' }
        ],
        affiliate: {
          name: 'Global Travel Partners',
          code: 'GTP-001',
          email: 'support@gtp.com',
          phone: '+1 (800) 999-9999',
          agent: 'Michael Scott'
        }
      });
      setLoading(false);
    }, 800);
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-700'; // success
      case 'expired': return 'bg-gray-100 text-gray-700'; // grey
      case 'cancelled': return 'bg-red-100 text-red-700'; // error
      case 'pending': return 'bg-yellow-100 text-yellow-700'; // warning
      default: return 'bg-blue-100 text-blue-700'; // primary
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium text-lg">Loading coverage details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!data) return <AdminLayout>Error loading data</AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto pb-8">
        {/* Breadcrumbs - Matching Vue Logic */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Admin</Link>
          <IconChevronRight size={16} className="mx-2 text-gray-400" />
          <Link href="/admin/coverages" className="hover:text-blue-600 transition-colors">Coverages</Link>
          <IconChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-400 pointer-events-none">Details</span>
        </div>

        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Coverage - {data.externalCertificate}</h1>
        </div>

        {/* Generic Card Container for Tabs */}
        <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Tabs Header */}
          <div className="border-b border-gray-100">
            <div className="flex px-2">
              <button
                onClick={() => setActiveTab('information')}
                className={`flex items-center gap-2 px-6 py-5 transition-colors border-b-2 font-medium text-[15px]
                    ${activeTab === 'information' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                style={{ color: activeTab === 'information' ? '#0078FC' : undefined, borderColor: activeTab === 'information' ? '#0078FC' : undefined }}
              >
                <IconShieldCheck size={20} />
                Information
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex items-center gap-2 px-6 py-5 transition-colors border-b-2 font-medium text-[15px]
                    ${activeTab === 'payment' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                style={{ color: activeTab === 'payment' ? '#0078FC' : undefined, borderColor: activeTab === 'payment' ? '#0078FC' : undefined }}
              >
                <IconCreditCard size={20} />
                Payment
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6 bg-gray-50/10">
            {activeTab === 'information' ? (
              <div className="space-y-6">

                {/* Information Tab Content - Component: InformationTab.vue */}

                {/* Coverage Overview Section */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <IconShieldCheck className="text-gray-700" size={22} stroke={1.5} />
                      <h3 className="font-bold text-gray-800 text-[17px]">Coverage Overview</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[15px]">
                        <div>
                          <div className="mb-4">
                            <div className="flex items-center">
                              <strong className="text-gray-700 min-w-[100px]">Certificate:</strong>
                              <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide ml-2 uppercase">
                                {data.externalCertificate}
                              </span>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-center">
                              <strong className="text-gray-700 min-w-[100px]">Status:</strong>
                              <span className={`px-2.5 py-0.5 rounded text-xs font-bold tracking-wide ml-2 uppercase ${getStatusColor(data.status)}`}>
                                {data.status}
                              </span>
                            </div>
                          </div>
                          <div className="mb-4 text-gray-600">
                            <strong className="text-gray-700 block mb-1">External Coverage ID:</strong>
                            {data.externalId}
                          </div>
                          <div className="mb-4 text-gray-600">
                            <strong className="text-gray-700 block mb-1">Insurance Program:</strong>
                            {data.program.product_name} ({data.program.product_code})
                          </div>
                          <div className="text-gray-600">
                            <strong className="text-gray-700 block mb-1">Created:</strong>
                            {new Date(data.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <div>
                          <div className="mb-4 text-gray-600">
                            <strong className="text-gray-700 block mb-1">Paid Amount:</strong>
                            {formatCurrency(data.amount)}
                          </div>
                          <div className="mb-4 text-gray-600">
                            <strong className="text-gray-700 block mb-1">Payment Type:</strong>
                            {data.paymentType}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 mt-6 pt-6 flex justify-center gap-4">
                        <button className="flex items-center gap-2 bg-[#0078FC] text-white px-6 py-2.5 rounded-full font-semibold shadow hover:bg-blue-700 hover:-translate-y-0.5 transition-all text-sm">
                          <IconDownload size={18} /> Download Coverage
                        </button>
                        <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-700 hover:-translate-y-0.5 transition-all text-sm shadow hover:shadow-md">
                          <IconSettings size={18} /> Manage Coverage
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Customer & Trip Details Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Information */}
                    <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <IconUser className="text-gray-700" size={22} stroke={1.5} />
                        <h3 className="font-bold text-gray-800 text-[17px]">Customer Information</h3>
                      </div>
                      <div className="p-6 text-[15px]">
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700">Name: </strong>
                          {data.customer.firstName} {data.customer.lastName}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700">Email: </strong>
                          {data.customer.email}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700">Phone: </strong>
                          {data.customer.phone}
                        </div>
                        <div className="text-gray-600">
                          <strong className="text-gray-700">Address: </strong>
                          {data.customer.address}
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <IconPlane className="text-gray-700" size={22} stroke={1.5} />
                        <h3 className="font-bold text-gray-800 text-[17px]">Trip Details</h3>
                      </div>
                      <div className="p-6 text-[15px]">
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Departure:</strong>
                          {data.trip.departure.city}, {data.trip.departure.state}, {data.trip.departure.country}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Destination:</strong>
                          {data.trip.destination.city}, {data.trip.destination.country}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Departure Date:</strong>
                          {formatDate(data.trip.departure.date)}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Return Date:</strong>
                          {formatDate(data.trip.return_date)}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Number of Travelers:</strong>
                          {data.trip.travelers}
                        </div>
                        <div className="text-gray-600">
                          <strong className="text-gray-700 block mb-1">Trip Cost:</strong>
                          {formatCurrency(data.trip.tripCost)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Travelers */}
                  {data.additionalTravelers.length > 0 && (
                    <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <IconUsers className="text-gray-700" size={22} stroke={1.5} />
                        <h3 className="font-bold text-gray-800 text-[17px]">Additional Travelers</h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.additionalTravelers.map((traveler: any, idx: number) => (
                            <div key={idx} className="border border-gray-200 rounded-[12px] p-4 bg-white hover:border-blue-200 transition-colors">
                              <div className="font-bold text-gray-800 mb-1">{traveler.firstName} {traveler.lastName}</div>
                              <div className="text-xs text-gray-500">Birth Date: {formatDate(traveler.birthDate)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Affiliate Info */}
                  <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <IconBuilding className="text-gray-700" size={22} stroke={1.5} />
                      <h3 className="font-bold text-gray-800 text-[17px]">Affiliate Organization</h3>
                    </div>
                    <div className="p-6 text-[15px]">
                      <div className="mb-4 text-gray-600">
                        <strong className="text-gray-700 block mb-1">Organization:</strong>
                        {data.affiliate.name}
                      </div>
                      <div className="mb-4">
                        <strong className="text-gray-700 block mb-1">Affiliate Code:</strong>
                        <span className="bg-green-50 text-green-700 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase">
                          {data.affiliate.code}
                        </span>
                      </div>
                      <div className="mb-4 text-gray-600">
                        <strong className="text-gray-700 block mb-1">Email:</strong>
                        {data.affiliate.email}
                      </div>
                      <div className="mb-4 text-gray-600">
                        <strong className="text-gray-700 block mb-1">Phone:</strong>
                        {data.affiliate.phone}
                      </div>
                      <div className="text-gray-600">
                        <strong className="text-gray-700 block mb-1">Agent:</strong>
                        {data.affiliate.agent}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Payment Tab Content - Component: PaymentTab.vue */
              <div className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <IconCreditCard className="text-gray-700" size={22} stroke={1.5} />
                    <h3 className="font-bold text-gray-800 text-[17px]">Payment Summary</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[15px]">
                      <div>
                        <div className="mb-4">
                          <strong className="text-gray-700 block mb-1">Total Amount:</strong>
                          <span className="text-xl text-emerald-600 font-medium">
                            {formatCurrency(data.amount)}
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center">
                            <strong className="text-gray-700 min-w-[100px]">Status:</strong>
                            <span className={`px-2.5 py-0.5 rounded text-xs font-bold tracking-wide ml-2 uppercase ${getStatusColor(data.paymentStatus === 'paid' ? 'active' : 'pending')}`}>
                              {data.paymentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="text-gray-600">
                          <strong className="text-gray-700 block mb-1">Payment Method:</strong>
                          {data.paymentMethod}
                        </div>
                      </div>
                      <div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Payment Date:</strong>
                          {new Date(data.paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-gray-600">
                          <strong className="text-gray-700 block mb-1">Currency:</strong>
                          {data.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <IconCreditCard className="text-gray-700" size={22} stroke={1.5} />
                      <h3 className="font-bold text-gray-800 text-[17px]">Payment Details</h3>
                    </div>
                    <div className="p-6 text-[15px]">
                      <div className="mb-3">
                        <strong className="text-gray-700">ID:</strong>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded ml-2 font-mono text-gray-600">{data.id}_pay</code>
                      </div>
                      <div className="mb-3">
                        <strong className="text-gray-700">Payment Intent:</strong>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded ml-2 font-mono text-gray-600">pi_3M...234</code>
                      </div>
                    </div>
                  </div>

                  {data.affiliate && (
                    <div className="bg-white rounded-[16px] border border-gray-100/60 p-0 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <IconBuilding className="text-gray-700" size={22} stroke={1.5} />
                        <h3 className="font-bold text-gray-800 text-[17px]">Commission Information</h3>
                      </div>
                      <div className="p-6 text-[15px]">
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Affiliate Organization:</strong>
                          {data.affiliate.name}
                        </div>
                        <div className="mb-4 text-gray-600">
                          <strong className="text-gray-700 block mb-1">Affiliate Agent:</strong>
                          {data.affiliate.agent}
                        </div>
                        <div className="text-gray-400 text-sm italic mt-4">
                          Commission calculation details would be displayed here based on your commission tracking system.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    IconSearch,
    IconFilter,
    IconFilePlus,
    IconCopy,
    IconEye,
    IconPencil,
    IconTrash,
    IconMail,
    IconX,
    IconCalendar,
    IconAdjustmentsHorizontal,
    IconUser,
    IconBriefcase,
    IconShieldCheck,
    IconSettings,
    IconClipboardCheck,
    IconCheck,
    IconChevronLeft,
    IconChevronRight
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

// Types
type QuoteStatus = 'active' | 'used' | 'expired';

interface Quote {
    id: string;
    product_code: string;
    organization_name: string;
    first_name: string;
    last_name: string;
    email: string;
    departure_city: string;
    destination_city: string;
    departure_date: string;
    return_date: string;
    travelers: number;
    trip_cost: number;
    status: QuoteStatus;
    created_at: string;
}

// Dummy Data
const MOCK_QUOTES: Quote[] = [
    {
        id: 'Q-1001',
        product_code: 'TPE-2025',
        organization_name: 'Acme Travel Corp',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        departure_city: 'New York',
        destination_city: 'London',
        departure_date: '2025-05-15',
        return_date: '2025-05-25',
        travelers: 2,
        trip_cost: 4500.00,
        status: 'active',
        created_at: '2025-01-18T10:30:00Z'
    },
    {
        id: 'Q-1002',
        product_code: 'APA-2025',
        organization_name: 'Globetrotter Inc',
        first_name: 'Sarah',
        last_name: 'Smith',
        email: 'sarah.smith@example.com',
        departure_city: 'San Francisco',
        destination_city: 'Tokyo',
        departure_date: '2025-06-10',
        return_date: '2025-06-20',
        travelers: 1,
        trip_cost: 2800.00,
        status: 'used',
        created_at: '2025-01-15T14:15:00Z'
    },
    // Removed unrelated org quotes for realism if needed, but keeping for demo
];

export default function ManagerQuotesPage() {
    // State
    const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter State
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Dialog State (simplified)
    const [viewDialog, setViewDialog] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

    // Create Quote Wizard State
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [createForm, setCreateForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        travelers: 1,
        tripCost: '',
        departureDate: '',
        departureCity: '',
        product: '',
        organization: '',
        assignedUser: '',
        expirationDate: ''
    });

    const updateCreateForm = (field: string, value: any) => {
        setCreateForm(prev => ({ ...prev, [field]: value }));
    };

    const handleCreateOpen = () => {
        setCurrentStep(1);
        setCreateForm({
            firstName: '',
            lastName: '',
            email: '',
            travelers: 1,
            tripCost: '',
            departureDate: '',
            departureCity: '',
            product: '',
            organization: 'My Travel Group',
            assignedUser: '',
            expirationDate: ''
        });
        setIsCreateDialogOpen(true);
    };

    const handleNextStep = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSaveQuote = () => {
        setLoading(true);
        setTimeout(() => {
            const newQuote: Quote = {
                id: `Q-${Math.floor(Math.random() * 10000)}`,
                product_code: 'MTB-2026',
                organization_name: createForm.organization,
                first_name: createForm.firstName,
                last_name: createForm.lastName,
                email: createForm.email,
                departure_city: createForm.departureCity,
                destination_city: 'Multiple',
                departure_date: createForm.departureDate,
                return_date: createForm.departureDate ? new Date(new Date(createForm.departureDate).setFullYear(new Date(createForm.departureDate).getFullYear() + 1)).toISOString().split('T')[0] : '',
                travelers: createForm.travelers,
                trip_cost: parseFloat(createForm.tripCost) || 0,
                status: 'active',
                created_at: new Date().toISOString()
            }
            setQuotes([newQuote, ...quotes]);
            setLoading(false);
            setIsCreateDialogOpen(false);
            toast.success('Quote created successfully');
        }, 1000);
    };

    // Derived State
    const filteredQuotes = useMemo(() => {
        return quotes.filter(quote => {
            // Search
            const searchMatch =
                quote.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.id.toLowerCase().includes(searchTerm.toLowerCase());

            if (!searchMatch) return false;

            // Status Filter
            if (statusFilter.length > 0 && !statusFilter.includes(quote.status)) return false;

            // Date Filter (Created At)
            if (dateFrom && new Date(quote.created_at) < new Date(dateFrom)) return false;
            if (dateTo) {
                const toDate = new Date(dateTo);
                toDate.setHours(23, 59, 59); // End of day
                if (new Date(quote.created_at) > toDate) return false;
            }

            return true;
        });
    }, [quotes, searchTerm, statusFilter, dateFrom, dateTo]);

    const hasActiveFilters = searchTerm || statusFilter.length > 0 || dateFrom || dateTo;

    // Actions
    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter([]);
        setDateFrom('');
        setDateTo('');
    };

    const handleCopyLink = (id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}/checkout/${id}`);
        toast.success('Checkout link copied to clipboard');
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this quote?')) {
            setQuotes(quotes.filter(q => q.id !== id));
            toast.success('Quote deleted successfully');
        }
    };

    const handleView = (quote: Quote) => {
        setSelectedQuote(quote);
        setViewDialog(true);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-8">
            {/* Breadcrumbs */}
            <div className="flex items-center text-lg text-gray-500 ">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">Ricky's Org Quotes</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <Link href="/manager/dashboard" className="hover:text-blue-600 transition-colors">Affiliate Manager</Link>
                <span className="mx-2 text-gray-400">›</span>
                <span className="text-gray-400 pointer-events-none">Quotes</span>
            </div>

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#005047] ">Quotes</h1>
                <p className="text-gray-500 mt-1">View and manage quotes for your organization</p>
            </div>

            {/* Filters Card */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-4">
                    <div className="w-full md:w-1/3 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IconSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search quotes..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-3xl transition-all border w-full sm:w-auto ${showFilters
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'bg-white border-gray-200 text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            <IconAdjustmentsHorizontal size={20} />
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </button>
                        <button
                            onClick={handleCreateOpen}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-3xl shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
                        >
                            <IconFilePlus size={20} />
                            New Quote
                        </button>
                    </div>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Organization filter removed, assuming single org context */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                                <select
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                                    value={statusFilter[0] || ''}
                                    onChange={(e) => setStatusFilter(e.target.value ? [e.target.value] : [])}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="used">Used</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">From Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">To Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto thin-scrollbar">
                    <table className="min-w-[900px] w-full">
                        <thead>
                            <tr className="bg-white border-b border-gray-100 text-left">
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[100px]">Product</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[200px]">Contact</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[200px] hidden lg:table-cell">Trip details</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] hidden sm:table-cell">Cost</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[100px]">Status</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] hidden xl:table-cell">Created</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[150px] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredQuotes.length > 0 ? (
                                filteredQuotes.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${quote.status === 'used' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'
                                                }`}>
                                                {quote.product_code}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-medium text-gray-900 text-sm">{quote.first_name} {quote.last_name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{quote.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 hidden lg:table-cell">
                                            <div>
                                                <div className="text-sm text-gray-900">{quote.departure_city} → {quote.destination_city}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">
                                                    {formatDate(quote.departure_date)} - {formatDate(quote.return_date)}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-0.5">
                                                    {quote.travelers} traveler{quote.travelers > 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 hidden sm:table-cell">
                                            <span className="text-sm font-medium text-gray-900">{formatCurrency(quote.trip_cost)}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${quote.status === 'active'
                                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                : quote.status === 'used'
                                                    ? 'bg-green-50 text-green-700 border-green-100'
                                                    : 'bg-red-50 text-red-700 border-red-100'
                                                }`}>
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 hidden xl:table-cell">
                                            <span className="text-sm text-gray-500">{formatDate(quote.created_at)}</span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                {quote.status === 'used' ? (
                                                    <button
                                                        onClick={() => handleView(quote)}
                                                        className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="View Details"
                                                    >
                                                        <IconEye size={18} />
                                                    </button>
                                                ) : (
                                                    <>
                                                        {quote.status === 'active' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleCopyLink(quote.id)}
                                                                    className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                                    title="Copy Checkout Link"
                                                                >
                                                                    <IconCopy size={18} />
                                                                </button>
                                                                <button
                                                                    className="p-1.5 text-amber-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                                    title="Email Quote"
                                                                >
                                                                    <IconMail size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                            title="Edit Quote"
                                                        >
                                                            <IconPencil size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(quote.id)}
                                                            className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                            title="Delete Quote"
                                                        >
                                                            <IconTrash size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <IconSearch size={24} className="text-gray-400 mb-2" />
                                            <p>No quotes found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Footer */}
                <div className="bg-white border-t border-gray-100 p-4 flex flex-row items-center justify-between gap-4 overflow-x-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                        <span>Showing <span className="font-medium">{filteredQuotes.length > 0 ? 1 : 0}</span> to <span className="font-medium">{filteredQuotes.length}</span> of <span className="font-medium">{filteredQuotes.length}</span> quotes</span>
                    </div>
                    {/* Simple Pagination Controls (Static) */}
                    <div className="flex items-center gap-1">
                        <button disabled className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50">‹</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-50 text-sm font-medium text-blue-600">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">›</button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        /* 🔒 Prevent page-level horizontal scroll */
        html,
        body {
          overflow-x: hidden;
        }

        /* Thin Scrollbar */
        .thin-scrollbar::-webkit-scrollbar {
          height: 4px; /* Minimalistic height */
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
           background-color: #94a3b8;
        }
      `}</style>

            {/* View Dialog same as before */}
            {viewDialog && selectedQuote && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Quote Details</h3>
                            <button onClick={() => setViewDialog(false)}><IconX size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-2">
                            <p><strong>ID:</strong> {selectedQuote.id}</p>
                            <p><strong>Name:</strong> {selectedQuote.first_name} {selectedQuote.last_name}</p>
                            <p><strong>Trip Cost:</strong> {formatCurrency(selectedQuote.trip_cost)}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Wizard simplified for brevity but functionally present in logic above... 
          actually I should copy the wizard JSX from admin page if I want it to work.
          I'll include the wizard JSX here.
      */}
            {/* Create Quote Wizard Modal */}
            {isCreateDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[16px] shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

                        {/* Header */}
                        <div className="bg-[#003D36] px-6 py-4 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-medium text-white">Create Quote</h3>
                            <button
                                onClick={() => setIsCreateDialogOpen(false)}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        {/* Stepper */}
                        <div className="pt-8 pb-6 px-12 bg-[#F9FAFB] border-b border-black/30 shrink-0">
                            <div className="flex items-center justify-between w-full">
                                {[
                                    { id: 1, label: 'Contact', icon: IconUser },
                                    { id: 2, label: 'Trip', icon: IconBriefcase },
                                    { id: 3, label: 'Product', icon: IconShieldCheck },
                                    { id: 4, label: 'Settings', icon: IconSettings },
                                    { id: 5, label: 'Summary', icon: IconClipboardCheck },
                                ].map((step, index, array) => {
                                    const isActive = step.id === currentStep;
                                    const isCompleted = step.id < currentStep;

                                    // Icon Selection
                                    let StepIcon = step.icon;
                                    if (isCompleted) StepIcon = IconCheck;

                                    return (
                                        <div key={step.id} className="flex pb-8 items-center flex-1 last:flex-none">
                                            <div className="flex flex-col items-center gap-2 relative">
                                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-10 relative
                                                    ${isActive ? 'bg-[#0078FC] text-white shadow-lg shadow-blue-500/30' :
                                                        isCompleted ? 'bg-[#4caf50] text-white' : 'bg-[#e5e7eb] text-gray-400'
                                                    }`}>
                                                    <StepIcon size={24} stroke={isCompleted ? 4 : isActive ? 0 : 1.5} fill={isActive ? "currentColor" : "none"} />
                                                </div>
                                                <span className={`text-sm font-medium tracking-wide absolute -bottom-8 whitespace-nowrap text-[#003D36]`}>
                                                    {step.label}
                                                </span>
                                            </div>

                                            {/* Connector Line */}
                                            {index < array.length - 1 && (
                                                <div className={`flex-1 h-[2px] mx-8 transition-colors duration-300 ${isCompleted ? 'bg-[#4caf50]' : 'bg-gray-200'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 overflow-y-auto flex-1 bg-white mt-4">

                            {/* Step 1: Contact */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <IconUser className="text-[#003D36]" size={20} />
                                        <h4 className="text-base font-bold text-[#003D36]">Contact Information</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">First Name *</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-md border border-blue-100 bg-[#eff6ff] focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                value={createForm.firstName}
                                                onChange={(e) => updateCreateForm('firstName', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last Name *</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-md border border-blue-100 bg-[#eff6ff] focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                value={createForm.lastName}
                                                onChange={(e) => updateCreateForm('lastName', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address *</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-2.5 rounded-md border border-blue-100 bg-[#eff6ff] focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                value={createForm.email}
                                                onChange={(e) => updateCreateForm('email', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Trip */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <IconBriefcase className="text-[#003D36]" size={20} />
                                        <h4 className="text-base font-bold text-[#003D36]">Trip Details</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Number of Travelers *</label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                value={createForm.travelers}
                                                onChange={(e) => updateCreateForm('travelers', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Trip Cost *</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                                                <input
                                                    type="number"
                                                    className="w-full pl-7 pr-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                    value={createForm.tripCost}
                                                    onChange={(e) => updateCreateForm('tripCost', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Departure Date *</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                value={createForm.departureDate}
                                                onChange={(e) => updateCreateForm('departureDate', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Departure City (US only) *</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900"
                                                value={createForm.departureCity}
                                                onChange={(e) => updateCreateForm('departureCity', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Product */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <IconShieldCheck className="text-[#003D36]" size={20} />
                                        <h4 className="text-base font-bold text-[#003D36]">Product Selection</h4>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Insurance Product *</label>
                                        <select
                                            className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-700"
                                            value={createForm.product}
                                            onChange={(e) => updateCreateForm('product', e.target.value)}
                                        >
                                            <option>MULTI-TRIP Basics (MTB) - Annual - $109.00</option>
                                            <option>Travel Essentials - Trip - $45.00</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Quote Cost</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-[#F8FAFC] text-gray-500 outline-none cursor-not-allowed text-sm"
                                            value="$109.00"
                                        />
                                    </div>
                                    <div className="bg-[#E6F4EA] border border-none rounded-md px-4 py-3 flex items-center gap-3 text-[#1E4620]">
                                        <div className="bg-[#34A853] p-0.5 rounded-full text-white"><IconCheck size={12} stroke={4} /></div>
                                        <span className="text-xs font-medium">The premium will be calculated based on your trip details.</span>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Settings */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <IconSettings className="text-[#003D36]" size={20} />
                                        <h4 className="text-base font-bold text-[#003D36]">Organization</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Organization *</label>
                                            <select
                                                className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-700"
                                                value={createForm.organization}
                                                onChange={(e) => updateCreateForm('organization', e.target.value)}
                                            >
                                                <option>My Travel Group</option>
                                                <option>Acme Corp</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Assigned User</label>
                                            <select
                                                className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-700"
                                                value={createForm.assignedUser}
                                                onChange={(e) => updateCreateForm('assignedUser', e.target.value)}
                                            >
                                                <option>crispaul obana</option>
                                                <option>Admin User</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <IconCalendar className="text-[#003D36]" size={20} />
                                            <h4 className="text-base font-bold text-[#003D36]">Quote Expiration</h4>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Expires On *</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-700"
                                                value={createForm.expirationDate}
                                                onChange={(e) => updateCreateForm('expirationDate', e.target.value)}
                                            />
                                            <p className="text-[10px] text-gray-400 mt-1">Quote has expired</p>
                                        </div>
                                        <div className="mt-4 bg-[#E3F2FD] border border-none rounded-md px-4 py-3 flex items-center gap-3 text-[#0D47A1]">
                                            <div className="bg-[#2196F3] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">i</div>
                                            <span className="text-xs font-medium">The quote will be valid until the expiration date.</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Summary */}
                            {currentStep === 5 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <IconCheck className="w-5 h-5 bg-[#4caf50] text-white rounded-full p-0.5" />
                                        <h4 className="text-base font-bold text-[#003D36]">Contact Information</h4>
                                    </div>

                                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm mb-6">
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">First Name</p>
                                                <p className="text-sm text-gray-900 font-medium">{createForm.firstName}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Last Name</p>
                                                <p className="text-sm text-gray-900 font-medium">{createForm.lastName}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Email Address</p>
                                                <p className="text-sm text-gray-900 font-medium">{createForm.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-5 h-5 bg-[#4caf50] text-white rounded-full flex items-center justify-center p-0.5">
                                            <IconCheck size={14} stroke={3} />
                                        </div>
                                        <h4 className="text-base font-bold text-[#003D36]">Trip Details</h4>
                                    </div>

                                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Number of Travelers</p>
                                                <p className="text-sm text-gray-900 font-medium">{createForm.travelers}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Trip Cost</p>
                                                <p className="text-sm text-gray-900 font-medium">${formatCurrency(parseFloat(createForm.tripCost) || 0)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Departure Date</p>
                                                <p className="text-sm text-gray-900 font-medium">{createForm.departureDate ? formatDate(createForm.departureDate) : '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Departure City</p>
                                                <p className="text-sm text-gray-900 font-medium">{createForm.departureCity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="px-8 py-4 border-t border-gray-100 bg-white shrink-0 flex justify-between items-center">
                            {currentStep > 1 ? (
                                <button
                                    onClick={handlePrevStep}
                                    className="px-5 py-2 border border-gray-300 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2"
                                >
                                    <IconChevronLeft size={16} />
                                    Previous
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsCreateDialogOpen(false)}
                                    className="px-5 py-2 border border-gray-300 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
                                >
                                    Cancel
                                </button>
                            )}

                            {currentStep < 5 ? (
                                <button
                                    onClick={handleNextStep}
                                    className="px-8 py-2 bg-[#0078FC] hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-all flex items-center gap-2"
                                >
                                    Next
                                    <IconChevronRight size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSaveQuote}
                                    disabled={loading}
                                    className="px-8 py-2 bg-[#0078FC] hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-all flex items-center gap-2"
                                >
                                    {loading ? 'Saving...' : 'Save Quote'}
                                    {!loading && <IconCheck size={16} />}
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  IconSearch,
  IconRefresh,
  IconMapPin,
  IconTrash,
  IconUpload,
  IconDownload,
  IconFileText,
  IconX
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

// Types
interface ExcludedLocation {
  from_country: string;
  from_state: string;
  to_country: string;
  to_state: string;
}

interface Program {
  id: number;
  product_code: string;
  product_name: string;
  product_type: string;
  product_sub_type: 'annual' | 'trip';
  retail: number;
  is_percentage: boolean;
  updated_at: string;
  sample_document_path: string | null;
  excluded_locations: string | null; // JSON string in DB, but we'll simulate parsing
}

// Dummy Data
const MOCK_PROGRAMS: Program[] = [
  {
    id: 1,
    product_code: 'TPE-2025',
    product_name: 'Travel Protector Essentials',
    product_type: 'Comprehensive',
    product_sub_type: 'trip',
    retail: 45.00,
    is_percentage: false,
    updated_at: '2025-01-10T10:30:00Z',
    sample_document_path: 'docs/tpe-2025.pdf',
    excluded_locations: '[{"from_country": "*", "from_state": "NY", "to_country": "CU", "to_state": "*"}]'
  },
  {
    id: 2,
    product_code: 'APA-2025',
    product_name: 'Annual Professional Advantage',
    product_type: 'Multi-Trip',
    product_sub_type: 'annual',
    retail: 250.00,
    is_percentage: false,
    updated_at: '2025-01-12T14:15:00Z',
    sample_document_path: null,
    excluded_locations: null
  },
  {
    id: 3,
    product_code: 'STD-2024',
    product_name: 'Standard Trip Defines',
    product_type: 'Basic',
    product_sub_type: 'trip',
    retail: 30.00,
    is_percentage: false,
    updated_at: '2024-12-28T09:00:00Z',
    sample_document_path: 'docs/std-2024.pdf',
    excluded_locations: null
  }
];

export default function ProgramsPage() {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[]>(MOCK_PROGRAMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Dialog States
  const [locationsDialog, setLocationsDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [parsedLocations, setParsedLocations] = useState<ExcludedLocation[]>([]);

  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadingProgram, setUploadingProgram] = useState<Program | null>(null);

  // Derived State
  const filteredPrograms = useMemo(() => {
    return programs.filter(p =>
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.product_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [programs, searchTerm]);

  // Actions
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Programs refreshed successfully');
    }, 1500);
  };

  const openLocationsDialog = (program: Program) => {
    setSelectedProgram(program);
    if (program.excluded_locations) {
      try {
        setParsedLocations(JSON.parse(program.excluded_locations));
      } catch (e) {
        setParsedLocations([]);
      }
    } else {
      setParsedLocations([]);
    }
    setLocationsDialog(true);
  };

  const openUploadDialog = (program: Program) => {
    setUploadingProgram(program);
    setUploadFile(null);
    setUploadDialog(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setUploadFile(file);
    }
  };

  const handleUpload = () => {
    if (!uploadingProgram || !uploadFile) return;

    // Simulate upload
    setLoading(true);
    setTimeout(() => {
      const updatedPrograms = programs.map(p =>
        p.id === uploadingProgram.id
          ? { ...p, sample_document_path: `docs/${uploadFile.name}` }
          : p
      );
      setPrograms(updatedPrograms);
      setLoading(false);
      setUploadDialog(false);
      toast.success('Document uploaded successfully');
    }, 1000);
  };

  const handleDeleteDocument = (program: Program) => {
    if (confirm(`Are you sure you want to delete the sample document for ${program.product_name}?`)) {
      const updatedPrograms = programs.map(p =>
        p.id === program.id
          ? { ...p, sample_document_path: null }
          : p
      );
      setPrograms(updatedPrograms);
      toast.success('Document deleted successfully');
    }
  };

  const formatPrice = (price: number, isPercentage: boolean) => {
    return isPercentage ? `${price}%` : `$${price.toFixed(2)}`;
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-8">
      {/* Breadcrumbs */}
      <div className="text-lg text-gray-500 ">
        Travel Programs
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Admin</Link>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-400 pointer-events-none">Programs</span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#005047] mt-6">Travel Program Management</h1>
        <p className="text-gray-500 mt-1">View and manage all travel programs, pricing, and documentation</p>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="w-full md:w-1/3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, code, or type..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-3xl transition-all w-full md:w-auto ${refreshing
                ? 'bg-blue-50 text-blue-600'
                : 'bg-[#0078FC] hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                }`}
            >
              <IconRefresh size={20} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh Programs'}
            </button>
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto thin-scrollbar">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-left">
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] hidden md:table-cell">Code</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[250px]">Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] hidden sm:table-cell">Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px]">Price</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] hidden lg:table-cell">Updated</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[150px]">Document</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="font-medium text-gray-700">{program.product_code}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{program.product_name}</div>
                        <div className="md:hidden text-xs text-gray-500 mt-0.5">
                          {program.product_code} • {program.product_type}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600">{program.product_type}</span>
                        <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${program.product_sub_type === 'annual'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                          }`}>
                          {program.product_sub_type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(program.retail, program.is_percentage)}
                      </span>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span className="text-sm text-gray-500">
                        {new Date(program.updated_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {program.sample_document_path ? (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg transition-colors">
                          <IconDownload size={16} />
                          <span className="hidden lg:inline">View</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => openUploadDialog(program)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-lg transition-colors"
                        >
                          <IconUpload size={16} />
                          <span className="hidden lg:inline">Upload</span>
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openLocationsDialog(program)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all group relative"
                          title="View Excluded Locations"
                        >
                          <IconMapPin size={20} />
                        </button>

                        {program.sample_document_path && (
                          <button
                            onClick={() => handleDeleteDocument(program)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                            title="Delete Document"
                          >
                            <IconTrash size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <IconSearch size={24} className="text-gray-400" />
                      </div>
                      <p>No programs found matching your search</p>
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
            <span>Showing <span className="font-medium">{filteredPrograms.length > 0 ? 1 : 0}</span> to <span className="font-medium">{filteredPrograms.length}</span> of <span className="font-medium">{filteredPrograms.length}</span> programs</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-500">Rows:</span>
              <select className="border border-gray-300 rounded p-1 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 disabled:opacity-50" disabled>
                ‹
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-50 text-sm font-medium text-blue-600">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">
                ›
              </button>
            </div>
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

      {/* Excluded Locations Modal */}
      {locationsDialog && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-[#0078FC] border-b border-blue-500 flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Excluded Locations - {selectedProgram.product_name}</h3>
              <button onClick={() => setLocationsDialog(false)} className="text-white/80 hover:text-white transition-colors">
                <IconX size={24} />
              </button>
            </div>
            <div className="p-6">
              {parsedLocations.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconMapPin size={32} />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">No Location Restrictions</h4>
                  <p className="text-gray-500 mt-1">This program is available for all travel destinations.</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">This program has the following location restrictions:</p>
                  <div className="border rounded-lg divide-y divide-gray-100">
                    {parsedLocations.map((loc, idx) => (
                      <div key={idx} className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase text-gray-500 w-12">From:</span>
                          <span className="text-sm text-gray-800">
                            {loc.from_state === '*' ? 'All States' : loc.from_state}, {loc.from_country === '*' ? 'All Countries' : loc.from_country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase text-gray-500 w-12">To:</span>
                          <span className="text-sm text-gray-800">
                            {loc.to_state === '*' ? 'All States' : loc.to_state}, {loc.to_country === '*' ? 'All Countries' : loc.to_country}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                <p><span className="font-semibold">Product Code:</span> {selectedProgram.product_code}</p>
                <p><span className="font-semibold">Type:</span> {selectedProgram.product_type} ({selectedProgram.product_sub_type})</p>
                <p><span className="font-semibold">Price:</span> {formatPrice(selectedProgram.retail, selectedProgram.is_percentage)}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setLocationsDialog(false)}
                className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {uploadDialog && uploadingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-[#0078FC] border-b border-blue-500 flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Upload Sample Document</h3>
              <button onClick={() => setUploadDialog(false)} className="text-white/80 hover:text-white transition-colors">
                <IconX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50/50 p-4 rounded-lg mb-6 border border-blue-100">
                <h4 className="font-medium text-gray-900 text-sm mb-1">{uploadingProgram.product_name}</h4>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p>Code: {uploadingProgram.product_code}</p>
                  <p>Type: {uploadingProgram.product_type}</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select PDF Document</label>
                <div className="border-2 border-dashed border-gray-200 rounded-[12px] p-6 text-center hover:border-blue-400 transition-colors bg-gray-50/50 relative cursor-pointer group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <IconUpload className="text-gray-400 group-hover:text-blue-500 transition-colors mb-2" size={32} />
                    <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Click to upload or drag PDF</p>
                    <p className="text-xs text-gray-400 mt-1">Maximum size 10MB</p>
                  </div>
                </div>
              </div>

              {uploadFile && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                  <IconFileText className="text-blue-600 shrink-0" size={24} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{uploadFile.name}</p>
                    <p className="text-xs text-gray-500">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={() => setUploadFile(null)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                  >
                    <IconX size={16} />
                  </button>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setUploadDialog(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || loading}
                  className="flex-1 px-4 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Uploading...' : 'Upload Document'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

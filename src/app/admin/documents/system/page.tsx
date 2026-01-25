'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layouts';
import {
  IconUpload,
  IconFile,
  IconFileDescription,
  IconDownload,
  IconTrash,
  IconSearch,
  IconX
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

export default function SystemDocumentsPage() {
  const [loading, setLoading] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy Upload Form State
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    access_level: 'admin',
    file: null as File | null
  });

  // Dummy Documents Data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Q1 Financial Report.pdf',
      description: 'Quarterly financial summary for Q1 2025',
      type: 'pdf',
      size: '2.4 MB',
      access: 'admin',
      created_at: '2025-01-15'
    },
    {
      id: 2,
      name: 'System Architecture Diagram.png',
      description: 'Updated architecture overview',
      type: 'image',
      size: '1.1 MB',
      access: 'system_wide',
      created_at: '2025-01-14'
    }
  ]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Upload
    setTimeout(() => {
      setLoading(false);
      setUploadDialog(false);
      toast.success('Document uploaded successfully');
      setUploadForm({ name: '', description: '', access_level: 'admin', file: null });
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0], name: e.target.files[0].name });
    }
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-8">
        {/* Breadcrumbs */}
        <div className="text-lg text-gray-500 ">
          System Document Management
        </div>
        <div className="flex items-center text-sm text-gray-500 ">
          <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Admin</Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-400 pointer-events-none">System Documents</span>
        </div>

        {/* Page Header & Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-6">
          <div>
            <h1 className="text-2xl font-bold text-[#005047]">System Document Management</h1>
            <p className="text-gray-500 mt-1">Manage documents that are available system-wide or to admin users only</p>
          </div>
          <button
            onClick={() => setUploadDialog(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all sm:self-start md:self-auto"
          >
            <IconUpload size={20} />
            Upload Document
          </button>
        </div>

        {/* Search & Filter Card */}
        <div className="bg-white rounded-[16px] shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[300px]">
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1" htmlFor="access-filter">Filter by access</label>
              <div className="relative">
                <select
                  id="access-filter"
                  className="w-full pl-3 pr-10 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="">All Documents</option>
                  <option value="admin">Admin Only</option>
                  <option value="system_wide">System Wide</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Content */}
        <div className="bg-white rounded-[16px] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" /><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" /><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" /><circle cx="12" cy="12" r="10" /></svg>
              </span>
              <h2 className="text-lg font-semibold text-gray-700">System Documents ({filteredDocs.length})</h2>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500 mb-6">System-wide documents available to all users</p>

            {filteredDocs.length > 0 ? (
              <div className="space-y-4">
                {filteredDocs.map((doc) => (
                  <div key={doc.id} className="flex flex-col md:flex-row items-center gap-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg px-2">
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 bg-[#0078FC] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        {doc.type.toUpperCase()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 text-center md:text-left">
                      <h3 className="font-medium text-gray-900 mb-1">{doc.name}</h3>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <IconFileDescription size={14} />
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          <span>Admin</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${doc.access === 'system_wide' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                          {doc.access === 'system_wide' ? 'System Wide' : 'Admin Only'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="shrink-0 flex items-center gap-2">
                      <button className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors" title="Download">
                        <IconDownload size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No documents found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {uploadDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-[16px] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800">Upload System Document</h3>
                <button onClick={() => setUploadDialog(false)} className="text-gray-400 hover:text-gray-600">
                  <IconX size={20} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Document</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50/50 cursor-pointer relative">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                    <IconUpload className="mx-auto text-gray-400 mb-2" size={32} />
                    {uploadForm.file ? (
                      <p className="text-sm font-medium text-blue-600">{uploadForm.file.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, Word, Excel, Images (Max 25MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    rows={3}
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={uploadForm.access_level}
                    onChange={(e) => setUploadForm({ ...uploadForm, access_level: e.target.value })}
                  >
                    <option value="admin">Admin Only - Only administrators</option>
                    <option value="system_wide">System Wide - All authenticated users</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setUploadDialog(false)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-70"
                    disabled={loading || !uploadForm.file || !uploadForm.name}
                  >
                    {loading ? 'Uploading...' : 'Upload Document'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

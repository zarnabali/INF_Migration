'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  IconSearch,
  IconRefresh,
  IconUserPlus,
  IconPencil,
  IconMail,
  IconTrash,
  IconX
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

// Types
interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  role: 'admin' | 'affiliate_manager';
  invite_status: 'accepted' | 'pending' | 'expired';
  last_login_at: string | null;
  first_login_at: string | null;
}

// Dummy Data
const MOCK_USERS: AdminUser[] = [
  {
    id: 'USR-001',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@inftravel.com',
    phone: '+1 (555) 010-9988',
    created_at: '2024-01-15T10:00:00Z',
    role: 'admin',
    invite_status: 'accepted',
    last_login_at: '2025-01-20T14:30:00Z',
    first_login_at: '2024-01-15T10:05:00Z'
  },
  {
    id: 'USR-002',
    first_name: 'Sarah',
    last_name: 'Manager',
    email: 'sarah.m@inftravel.com',
    phone: '',
    created_at: '2025-01-10T09:15:00Z',
    role: 'admin',
    invite_status: 'pending',
    last_login_at: null,
    first_login_at: null
  },
  {
    id: 'USR-003',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (408) 555-1234',
    created_at: '2024-11-20T11:00:00Z',
    role: 'admin',
    invite_status: 'accepted',
    last_login_at: '2025-01-19T08:45:00Z',
    first_login_at: '2024-11-20T11:30:00Z'
  }
];

export default function UsersPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  // Dialog States
  const [userDialog, setUserDialog] = useState(false);
  const [resurrectDialog, setResurrectDialog] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1); // -1 for new, >= 0 for edit
  const [editedItem, setEditedItem] = useState<Partial<AdminUser>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'admin'
  });

  // Current User (Simulated for "You" chip)
  const currentUserEmail = 'admin@inftravel.com';

  // Derived State
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const formTitle = editedIndex === -1 ? 'New Admin User' : 'Edit Admin User';

  // Actions
  const openNewUserDialog = () => {
    setEditedIndex(-1);
    setEditedItem({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      role: 'admin'
    });
    setUserDialog(true);
  };

  const openEditUserDialog = (user: AdminUser) => {
    setEditedIndex(1); // Just needs to be > -1
    setEditedItem({ ...user });
    setUserDialog(true);
  };

  const handleSaveUser = () => {
    setLoading(true);
    setTimeout(() => {
      if (editedIndex === -1) {
        // Add (Simulated)
        const newUser: AdminUser = {
          ...editedItem as AdminUser,
          id: `USR-${Math.floor(Math.random() * 1000)}`,
          created_at: new Date().toISOString(),
          invite_status: 'pending',
          last_login_at: null,
          first_login_at: null,
        };
        setUsers([newUser, ...users]);
        toast.success('User invited successfully');
      } else {
        // Edit (Simulated)
        setUsers(users.map(u => u.id === editedItem.id ? { ...u, ...editedItem } as AdminUser : u));
        toast.success('User updated successfully');
      }
      setLoading(false);
      setUserDialog(false);
    }, 800);
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (confirm(`Are you sure you want to deactivate ${user.first_name} ${user.last_name}?`)) {
      setUsers(users.filter(u => u.id !== user.id));
      toast.success(`${user.first_name} ${user.last_name} has been deactivated successfully.`);
    }
  };

  const handleResendInvite = (user: AdminUser) => {
    if (confirm(`Resend invitation to ${user.first_name} ${user.last_name}?`)) {
      toast.success(`Invitation resent to ${user.first_name} ${user.last_name}.`);
    }
  };

  const handleResurrect = () => {
    setResurrectDialog(false);
    toast.success('Users reactivated successfully');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastLogin = (dateString: string | null) => {
    if (!dateString) return 'Never';
    // Simple relative time or date
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-8">
      {/* Breadcrumbs */}
      <div className="text-lg text-gray-500 ">
        System Users
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/admin/dashboard" className="hover:text-blue-600 transition-colors">Admin</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-400 pointer-events-none">Users</span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#005047]">System User Management</h1>
        <p className="text-gray-500 mt-1">View and manage all administrative users across the system</p>
      </div>

      {/* Controls Card */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="w-full md:w-1/3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setResurrectDialog(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-green-700 bg-white border border-green-200 hover:bg-green-50 font-medium rounded-3xl transition-all w-full sm:w-auto"
            >
              <IconRefresh size={20} />
              Reactivate Users
            </button>
            <button
              onClick={openNewUserDialog}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0078FC] hover:bg-blue-700 text-white font-medium rounded-3xl shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
            >
              <IconUserPlus size={20} />
              Add Admin
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto thin-scrollbar">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-left">
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[150px]">First name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[150px]">Last name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[250px]">Email</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] hidden lg:table-cell">Created</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[100px]">Role</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px]">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[150px] hidden md:table-cell">Login</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 w-[120px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{user.first_name}</span>
                        {user.email === currentUserEmail && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">You</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{user.last_name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span className="text-sm text-gray-500">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize bg-blue-50 text-blue-700 border border-blue-100">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize border ${user.invite_status === 'accepted'
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : user.invite_status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                        {user.invite_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="text-sm text-gray-500" title={`First login: ${user.first_login_at ? new Date(user.first_login_at).toLocaleString() : 'Never'}`}>
                        {formatLastLogin(user.last_login_at)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {user.email !== currentUserEmail ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEditUserDialog(user)}
                            className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <IconPencil size={18} />
                          </button>
                          {user.invite_status === 'pending' && (
                            <button
                              onClick={() => handleResendInvite(user)}
                              className="p-1.5 text-amber-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                              title="Resend Invite"
                            >
                              <IconMail size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Deactivate"
                          >
                            <IconTrash size={18} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <IconSearch size={24} className="text-gray-400" />
                      </div>
                      <p>No users found</p>
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
            <span>Showing <span className="font-medium">{filteredUsers.length > 0 ? 1 : 0}</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{filteredUsers.length}</span> users</span>
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

      {/* User Dialog (Add/Edit) */}
      {userDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-sans">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-8 py-6 bg-[#26C6DA] flex justify-between items-center">
              <h3 className="font-normal text-2xl text-white tracking-wide">{formTitle}</h3>
              {/* Keeping Close button hidden or subtle as per screenshot which doesn't clearly show one, but good for UX */}
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              {editedIndex > -1 && (
                <div>
                  {/* Edit mode might need labels or read-only display, but sticking to design for New User */}
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    value={editedItem.id}
                    disabled
                    readOnly
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#26C6DA] focus:ring-1 focus:ring-[#26C6DA] transition-all text-base"
                    value={editedItem.first_name}
                    onChange={(e) => setEditedItem({ ...editedItem, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#26C6DA] focus:ring-1 focus:ring-[#26C6DA] transition-all text-base"
                    value={editedItem.last_name}
                    onChange={(e) => setEditedItem({ ...editedItem, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <input
                    type="email"
                    placeholder="User email"
                    className={`w-full px-5 py-3.5 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#26C6DA] focus:ring-1 focus:ring-[#26C6DA] transition-all text-base ${editedIndex > -1 ? 'bg-gray-50 text-gray-500' : ''}`}
                    value={editedItem.email}
                    onChange={(e) => setEditedItem({ ...editedItem, email: e.target.value })}
                    disabled={editedIndex > -1}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#26C6DA] focus:ring-1 focus:ring-[#26C6DA] transition-all text-base"
                    value={editedItem.phone}
                    onChange={(e) => setEditedItem({ ...editedItem, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-6 pt-8 mt-4">
                <button
                  onClick={() => setUserDialog(false)}
                  className="px-4 py-2 text-[#FF5252] font-medium hover:text-red-600 transition-colors text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  disabled={!editedItem.first_name || !editedItem.last_name || !editedItem.email}
                  className="px-10 py-2.5 bg-[#80DEEA] hover:bg-[#4DD0E1] text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resurrect Dialog (Simulated Placeholder) */}
      {resurrectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-green-800">Reactivate Deactivated Users</h3>
              <button onClick={() => setResurrectDialog(false)} className="text-green-800/60 hover:text-green-800">
                <IconX size={20} />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconRefresh size={32} />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Deactivated Users Found</h4>
              <p className="text-gray-500 text-sm mb-6">There are currently no deactivated users available for reactivation in this demo.</p>
              <button
                onClick={handleResurrect}
                className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

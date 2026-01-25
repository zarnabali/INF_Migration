'use client';

import { IconUserPlus, IconPencil, IconTrash, IconMail, IconRefresh, IconInfoCircle } from '@tabler/icons-react';

const mockMembers = [
    {
        id: 1,
        first_name: 'Waqas',
        last_name: 'Khan',
        email: 'waqaskhanm@gmail.com',
        phone: '',
        role: 'Manager',
        created_at: '17/01/2026',
        invite_status: 'Active',
        last_login: '2 hours ago',
        is_current_user: true
    },
    // Add more if needed but screenshot only shows one row primarily
];

export default function MembersTab() {
    return (
        <div className="space-y-6">
            <h4 className="text-lg font-medium text-[#005047] mb-4">Ricky's Org Members</h4>
            <p className="text-sm text-gray-500 mb-6">Manage your organization's members, add new team members, and control access permissions.</p>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
                {/* Header within card */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="text-gray-700"><IconUserPlus size={24} className="text-gray-600" /></div> {/* Using UserPlus as generic member icon or similar */}
                    <h5 className="text-xl font-medium text-gray-700">Member Management</h5>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search Ricky's Org Members"
                        className="w-full md:w-80 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-[#0078FC] text-[#0078FC] rounded-full hover:bg-blue-50 text-sm font-medium transition-all">
                            <IconRefresh size={18} />
                            Refresh
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0078FC] hover:bg-blue-600 text-white font-medium rounded-full shadow-sm transition-all text-sm">
                            <IconUserPlus size={18} />
                            Add Member
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">First Name</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Last Name</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Email</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Phone</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Role</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Created At</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Invite Status</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600">Last Login</th>
                                <th className="px-4 py-4 text-sm font-medium text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                            {member.first_name}
                                            {member.is_current_user && (
                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">You</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{member.last_name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{member.email}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{member.phone}</td>
                                    <td className="px-4 py-4">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{member.created_at}</td>
                                    <td className="px-4 py-4">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                                            {member.invite_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{member.last_login}</td>
                                    <td className="px-4 py-4 text-center text-sm text-gray-500">
                                        —
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <IconInfoCircle className="text-[#00B4D8]" size={24} />
                    <h5 className="text-lg font-medium text-gray-700">Member Guidelines</h5>
                </div>
                <div className="space-y-4 pl-8">
                    <div>
                        <h6 className="font-medium text-gray-800 text-sm">Affiliate Managers</h6>
                        <p className="text-sm text-gray-500">Can manage organization settings, add/remove members, view all reports, and manage commissions.</p>
                    </div>
                    <div>
                        <h6 className="font-medium text-gray-800 text-sm">Affiliate Members</h6>
                        <p className="text-sm text-gray-500">Can view their own performance, track commissions, and access basic reporting features.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

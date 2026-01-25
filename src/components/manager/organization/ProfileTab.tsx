'use client';

export default function ProfileTab() {
    return (
        <div className="space-y-8">
            {/* Organization Information */}
            <div>
                <h4 className="text-lg font-medium text-[#005047] mb-6">Organization Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Organization Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="Ricky's Org"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Primary Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="random@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">First Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="John"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="Wayne"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-500 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="2132223334"
                        />
                    </div>
                </div>
            </div>

            {/* Address */}
            <div>
                <h4 className="text-lg font-medium text-[#005047] mb-6">Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Address Line 1</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="123 Main St"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Address Line 2</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">City</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="Orange"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">State/Province</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="California"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Country</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="United States"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Postal Code</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-700"
                            defaultValue="90001"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="button" className="px-6 py-2.5 bg-[#0078FC] hover:bg-blue-600 text-white font-medium rounded-full shadow-md transition-all">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

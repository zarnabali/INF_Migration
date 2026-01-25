'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layouts/shared/Sidebar';
import { AdminHeader } from '@/components/layouts/AdminHeader';
import { IconMenu2 } from '@tabler/icons-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMiniSidebar, setIsMiniSidebar] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-[#F2F6FA] pt-[64px]">
            {/* Header */}
            <AdminHeader
                onToggleSidebar={() => setIsMiniSidebar(!isMiniSidebar)}
                isMiniSidebar={isMiniSidebar}
                onMobileToggle={() => setIsMobileOpen(!isMobileOpen)}
            />

            <div className="flex flex-1 relative">
                {/* Sidebar */}
                <Sidebar
                    isMobileOpen={isMobileOpen}
                    onMobileClose={() => setIsMobileOpen(false)}
                    isMiniSidebar={isMiniSidebar}
                />

                {/* Main Content Area - Grow with content, let body scroll */}
                <div className="flex-1 flex flex-col w-full relative transition-all duration-300">
                    <main className="flex-1 p-4 md:p-6 lg:p-8 bg-[#F2F6FA]">
                        <div className="max-w-[1600px] mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

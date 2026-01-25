'use client';

import { IconLogout } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import sidebarItems, { MenuItem } from './SidebarItems';
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material'; // Using MUI Drawer for functionality ease, styled with Tailwind
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

interface SidebarProps {
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
    isSidebarOpen?: boolean;
    isMiniSidebar?: boolean;
    items?: MenuItem[];
}

export const Sidebar = ({ isMobileOpen, onMobileClose, isSidebarOpen = true, isMiniSidebar = false, items = sidebarItems }: SidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        await logout();
        router.push('/auth/login');
    };

    // Calculate effective state: Collapsed if mini mode is on AND not hovered.
    // If mini mode is OFF, it's never collapsed.
    const isCollapsed = isMiniSidebar && !isHovered;
    const sidebarWidth = isCollapsed ? 80 : 270;

    // Determine the width of the placeholder (layout spacing)
    // The content should only shift if the user explicitly toggles the sidebar button (isMiniSidebar changes).
    // Hovering should NOT shift content, so placeholder width depends ONLY on isMiniSidebar.
    const placeholderWidth = isMiniSidebar ? 80 : 270;

    // Render a single menu item
    const NavItem = ({ item, collapsed }: { item: MenuItem, collapsed: boolean }) => {
        const isActive = item.href ? pathname === item.href : false;

        return (
            <Link
                href={item.href || '#'}
                className={`flex items-center gap-3 px-3 py-2.5 mx-3 rounded-3xl transition-all duration-200 group no-underline mb-1 relative
                    ${isActive
                        ? 'bg-[#0078FC] text-white shadow-md'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-[#0078FC]'
                    }
                    ${collapsed ? 'justify-center mx-2 px-2' : ''}
                `}
                title={collapsed ? item.title : ''}
            >
                {item.icon && (
                    <item.icon
                        size={22}
                        className={`transition-colors shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#0078FC]'}`}
                        stroke={1.5}
                    />
                )}
                {!collapsed && (
                    <span className={`text-[15px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isActive ? 'text-white' : ''}`}>
                        {item.title}
                    </span>
                )}
            </Link>
        );
    };

    // Render a header item
    const NavHeader = ({ item, collapsed }: { item: MenuItem, collapsed: boolean }) => {
        if (collapsed) return (
            <div className="text-center text-gray-400 text-2xl font-bold leading-none py-4 select-none">
                ...
            </div>
        );

        return (
            <div className="px-7 mt-6 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap overflow-hidden">
                {item.header}
            </div>
        );
    };

    const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
        const effectiveCollapsed = isMobile ? false : isCollapsed;

        return (
            <div className="flex flex-col h-full bg-white border-r border-gray-200 overflow-hidden">
                {/* Profile Header Section */}
                <div className="relative shrink-0 h-[170px] overflow-hidden group transition-all duration-300">
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src="/images/backgrounds/user-info.jpg"
                            alt="Profile Background"
                            className="w-full h-full object-cover"
                        />
                        {/* Optional overlay for contrast */}
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Profile Info Overlay */}
                    <div className={`relative z-10 h-full flex flex-col justify-end transition-all duration-300 ${effectiveCollapsed ? 'pb-4' : 'pb-0'}`}>
                        <div className={`profile-pulse rounded-full border-[3px] border-white/20 overflow-visible shadow-sm bg-white transition-all duration-300 
                        ${effectiveCollapsed ? 'w-[45px] h-[45px] mx-auto mb-2' : 'h-[80px] w-[80px] mx-6 mb-4'}
                    `}>
                            <img
                                src="/images/profile/user-1.jpg"
                                alt="Admin Profile"
                                className="w-full h-full object-cover rounded-full relative z-20"
                            />
                        </div>

                        {/* Text Section - Collapses when sidebar is minimized */}
                        <div className={`bg-gradient-to-r from-black/80 via-black/40 to-transparent py-3 px-6 transition-all duration-300 origin-bottom
                        ${effectiveCollapsed ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100 h-auto'}
                    `}>
                            <h5 className="text-[18px] font-medium text-white text-truncate leading-tight whitespace-nowrap">
                                Ricky Khan - Admin
                            </h5>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className={`flex-1 overflow-y-auto ${effectiveCollapsed ? 'px-1' : 'px-0'} pb-4 scrollbar-hide pt-2`}>
                    {items.map((item, index) => {
                        if (item.header) {
                            return <NavHeader key={index} item={item} collapsed={effectiveCollapsed} />;
                        }
                        return <NavItem key={index} item={item} collapsed={effectiveCollapsed} />;
                    })}
                </div>

                {/* Logout Section */}
                <div className={`p-4 border-t border-gray-100 ${effectiveCollapsed ? 'flex justify-center' : ''}`}>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-3xl transition-all duration-200 group no-underline text-gray-600 hover:bg-red-50 hover:text-red-600
                        ${effectiveCollapsed ? 'justify-center px-2' : ''}
                    `}
                        title="Log Out"
                    >
                        <IconLogout
                            size={22}
                            className="transition-colors shrink-0 text-gray-500 group-hover:text-red-600"
                            stroke={1.5}
                        />
                        {!effectiveCollapsed && (
                            <span className="text-[15px] font-medium whitespace-nowrap overflow-hidden">
                                Log Out
                            </span>
                        )}
                    </button>
                </div>
            </div>
        )
    };

    return (
        <>
            {/* Mobile Drawer */}
            <div className="lg:hidden">
                <Drawer
                    anchor="left"
                    open={isMobileOpen}
                    onClose={onMobileClose}
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            width: 270,
                            border: 'none',
                            boxShadow: '0px 8px 24px rgba(149,157,165,0.2)'
                        },
                    }}
                >
                    <SidebarContent isMobile={true} />
                </Drawer>
            </div>

            {/* Desktop Persistent Sidebar Placeholder */}
            {/* This div reserves the space in the flex layout so content doesn't jump */}
            <div
                className="hidden lg:block shrink-0 transition-all duration-300 ease-in-out h-full"
                style={{ width: placeholderWidth }}
            />

            {/* Desktop Hoverable Sidebar (Absolute Overlay) */}
            <div
                className="hidden lg:block fixed z-30 bg-white transition-all duration-300 ease-in-out border-r border-gray-200 shadow-xl"
                style={{
                    width: sidebarWidth,
                    left: 0,
                    top: 64, // Below the header (which is 64px)
                    bottom: 0
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <SidebarContent />
            </div>
        </>
    );
};

// Enhanced Pulse Animation
const styles = `
    @keyframes pulse-ring {
        0% { transform: scale(0.9); opacity: 0.8; }
        100% { transform: scale(2.2); opacity: 0; }
    }
    
    .profile-pulse {
        position: relative;
    }
    
    /* First Ring */
    .profile-pulse::before {
        content: '';
        position: absolute;
        left: 0; 
        top: 0;
        width: 100%; 
        height: 100%; 
        background-color: rgba(0, 0, 0, 0.25); /* Black slightly higher opacity */
        border-radius: 50%; 
        z-index: 10;
        animation: pulse-ring 3.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    
    /* Second Ring (Delayed) */
    .profile-pulse::after {
        content: '';
        position: absolute;
        left: 0; 
        top: 0;
        width: 100%; 
        height: 100%; 
        background-color: rgba(0, 0, 0, 0.25); /* Black slightly higher opacity */
        border-radius: 50%; 
        z-index: 10;
        animation: pulse-ring 3.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        animation-delay: 1.75s;
    }
`;

// Inject styles roughly (better to put in global css but this works for component scoped quick fix)
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

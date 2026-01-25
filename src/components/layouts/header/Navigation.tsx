'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Need to make sure we have heroicons or use standard SVG

// Define navigation structure
const navigation = [
    {
        menu: 'Pricing',
        href: '/pricing',
        badge: false,
    },
    {
        menu: 'Coverage',
        href: '',
        badge: false,
        children: [
            {
                menu: 'Single Trip',
                href: '/programs/single-trip',
            },
            {
                menu: 'Annual Individual',
                href: '/programs/annual-individual',
            },
            {
                menu: 'Annual Group',
                href: '/programs/annual-group',
            },
        ],
    },
    {
        menu: 'About',
        href: '/about',
        badge: false,
    },
    {
        menu: 'Contact',
        href: '/contact',
        badge: false,
    },
    {
        menu: 'Manage',
        href: '/locate-coverage',
        badge: false,
    },
];

export const Navigation = ({ className = "" }: { className?: string }) => {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (menu: string) => {
        if (openDropdown === menu) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(menu);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isChildActive = (children: any[]) => {
        if (!children) return false;
        return children.some((child) => pathname === child.href);
    };

    return (
        <div className={`flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-6 ${className}`}>
            {navigation.map((item, i) => (
                <div key={i} className="relative group">
                    {item.children ? (
                        <div ref={dropdownRef}>
                            <button
                                onClick={() => toggleDropdown(item.menu)}
                                className={`flex items-center gap-2 px-5 py-2 text-[16px] font-semibold text-[#3A4752] rounded-full transition-all duration-300
                                hover:text-primary hover:bg-primary/10
                                ${openDropdown === item.menu || isChildActive(item.children) ? 'text-primary bg-primary/10' : ''}`}
                            >
                                {item.menu}
                                <ChevronDownIcon
                                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.menu ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === item.menu && (
                                <div className="lg:absolute lg:top-full lg:left-0 mt-2 lg:mt-2 min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-50 flex flex-col gap-1 w-full relative">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.menu}
                                            href={child.href}
                                            onClick={() => setOpenDropdown(null)}
                                            className={`block px-4 py-2 text-[15px] font-medium text-[#3A4752] rounded-md transition-colors hover:text-primary hover:bg-primary/10
                                            ${pathname === child.href ? 'text-primary bg-primary/10' : ''}`}
                                        >
                                            {child.menu}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href={item.href}
                            className={`flex items-center gap-2 px-5 py-2 text-[16px] font-semibold text-[#3A4752] rounded-full transition-all duration-300
                            hover:text-primary hover:bg-primary/10
                            ${pathname === item.href ? 'text-primary bg-primary/10' : ''}`}
                        >
                            {item.menu}
                            {item.badge && (
                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    New
                                </span>
                            )}
                        </Link>
                    )}
                </div>
            ))}

            {/* Mobile Get Covered Button */}
            <div className="flex lg:hidden w-full mt-4">
                <Link
                    href="/pricing"
                    className="w-full bg-[#0078FC] hover:bg-[#0060d4] text-white text-[14px] font-semibold py-3 px-4 rounded-[10px] text-center transition-colors shadow-md"
                >
                    Get Covered
                </Link>
            </div>
        </div>
    );
};

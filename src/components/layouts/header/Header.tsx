'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoDark } from '@/components/layouts/shared/Logo';
import { Navigation } from './Navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b 
                ${isSticky
                        ? 'bg-white/65 backdrop-blur-md border-white/20 shadow-sm h-[60px] lg:h-[80px]'
                        : 'bg-transparent border-transparent shadow-none h-[80px]'
                    } flex items-center justify-center`}
            >
                <div className="w-full max-w-[1400px] h-full px-4 md:px-6 py-5">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo Section */}
                        <div className="w-[58%] sm:w-[33%] lg:w-[25%] flex items-center">
                            <LogoDark />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:w-[50%] justify-center">
                            <Navigation />
                        </div>

                        {/* Action Buttons */}
                        <div className="w-[42%] sm:w-[66%] lg:w-[25%] flex justify-end items-center h-full">
                            {/* Desktop Get Covered Button */}
                            <Link
                                href="/pricing"
                                className="hidden lg:flex bg-[#0078FC] hover:bg-[#0060d4] text-white px-6 py-3 rounded-3xl text-[16px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg items-center justify-center"
                            >
                                Get Covered
                            </Link>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={toggleMobileMenu}
                                className="lg:hidden text-primary ml-4 p-1 rounded-md hover:bg-gray-100"
                                aria-label="Toggle Menu"
                            >
                                {mobileOpen ? (
                                    <XMarkIcon className="w-8 h-8" />
                                ) : (
                                    <Bars3Icon className="w-8 h-8" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer / Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Menu Content */}
                <div
                    className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-xl transition-transform duration-300 ease-out transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col p-6`}
                >
                    <div className="mb-8">
                        <LogoDark />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <Navigation className="flex-col !gap-4 !items-start" />
                    </div>
                </div>
            </div>
        </>
    );
};

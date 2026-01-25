'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Card,
    CardContent,
    Collapse,
    Fade
} from '@mui/material';

interface Product {
    name: string;
    link: string;
    color: string;
}

interface Benefit {
    name: string;
    description: string;
    values: Record<string, string | boolean>;
}

interface BenefitsTableProps {
    products: Product[];
    benefits: Benefit[];
    fineprint?: string[];
}

export const BenefitsTable = ({ products, benefits, fineprint }: BenefitsTableProps) => {
    const [collapsedIndex, setCollapsedIndex] = useState<number | null>(null);
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showStickyNav, setShowStickyNav] = useState(false);

    const planSelectorRef = useRef<HTMLDivElement>(null);

    // Vue logic: reversedProducts for mobile view
    const reversedProducts = [...products].reverse();
    const activePlan = reversedProducts[activePlanIndex];

    const getBenefitValue = (benefit: Benefit) => {
        // Vue logic: key = activePlan.name.toLowerCase().replace(' ', '')
        const key = activePlan.name.toLowerCase().replace(/\s+/g, '');
        return benefit.values[key];
    };

    const getProductKey = (product: Product) => {
        return product.name.toLowerCase().replace(/\s+/g, '');
    };

    const toggleCollapse = (index: number) => {
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };

    const nextPlan = () => {
        setActivePlanIndex((prev) => (prev + 1) % reversedProducts.length);
    };

    const prevPlan = () => {
        setActivePlanIndex((prev) =>
            prev === 0 ? reversedProducts.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setShowStickyNav(false);
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking && window.innerWidth < 768 && planSelectorRef.current) {
                window.requestAnimationFrame(() => {
                    if (planSelectorRef.current) {
                        const rect = planSelectorRef.current.getBoundingClientRect();
                        setShowStickyNav(rect.bottom < 50);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            {!isMobile ? (
                // Desktop View
                <Card className="border mx-auto my-8 !rounded-[10px] !shadow-[0_2px_4px_rgba(0,0,0,0.1)] !overflow-hidden">
                    <TableContainer>
                        <Table sx={{ border: '1px solid rgba(0,0,0,0.2)', '& td, & th': { p: 2, borderBottom: '1px solid rgba(0,0,0,0.2)' } }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="w-[25%]" />
                                    {products.map((product) => (
                                        <TableCell
                                            key={product.name}
                                            className="w-[25%] text-center  text-[18px] border-l border-black/20"
                                            sx={{ backgroundColor: product.color }}
                                        >
                                            <p className='text-white'>{product.name}		</p>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {benefits.map((benefit, index) => (
                                    <TableRow key={benefit.name} className="hover:bg-black/5 transition-colors">
                                        <TableCell className="font-medium w-[25%] align-middle">
                                            {benefit.description ? (
                                                <div
                                                    className="text-[16px] flex justify-between items-center cursor-pointer select-none"
                                                    onClick={() => toggleCollapse(index)}
                                                >
                                                    <span dangerouslySetInnerHTML={{ __html: benefit.name }} />
                                                    <Icon icon={collapsedIndex === index ? "mdi:chevron-up" : "mdi:chevron-down"} width="20" />
                                                </div>
                                            ) : (
                                                <div className="text-[16px]">
                                                    <span dangerouslySetInnerHTML={{ __html: benefit.name }} />
                                                </div>
                                            )}

                                            <Collapse in={collapsedIndex === index}>
                                                <div className="text-[14px] font-normal text-[#0078FC] mt-2">
                                                    {benefit.description}
                                                </div>
                                            </Collapse>
                                        </TableCell>
                                        {products.map((product) => {
                                            const val = benefit.values[getProductKey(product)];
                                            return (
                                                <TableCell key={product.name} className="text-[16px] text-center w-[25%] border-l border-black/20 align-middle">
                                                    {typeof val === 'boolean' ? (
                                                        val ? (
                                                            <Icon icon="mdi:check" className="text-[#2CD07E] mx-auto" width="24" />
                                                        ) : (
                                                            <Icon icon="mdi:close" className="text-[#F8285A] mx-auto" width="24" />
                                                        )
                                                    ) : (
                                                        val
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                                <TableRow className="!bg-transparent hover:!bg-transparent border-none">
                                    <TableCell className="border-none" />
                                    {products.map((product) => (
                                        <TableCell key={product.name} className="text-center border-none p-4">
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: `${product.color} !important`,
                                                    color: 'white',
                                                    textTransform: 'capitalize',
                                                    boxShadow: 'none',
                                                    padding: '10px 24px',
                                                    fontSize: '0.875rem',
                                                    height: '40px',
                                                    borderRadius: '1.5rem !important',
                                                    '&:hover': {
                                                        backgroundColor: `${product.color} !important`,
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                                    }
                                                }}
                                                component={Link}
                                                href={product.link}
                                                size="large"
                                            >
                                                Get Covered Now
                                            </Button>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            ) : (
                // Mobile View
                <div className="mobile-view max-w-full">
                    {/* Sticky Nav */}
                    <Fade in={showStickyNav}>
                        <Card
                            className="fixed top-[60px] left-0 right-0 z-[999] !m-0 !rounded-b-[12px] !rounded-t-0 bg-white/95 backdrop-blur-md shadow-md"
                        >
                            <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                    <Button onClick={prevPlan} disabled={products.length <= 1} min-width="0" className="!min-w-0 !p-2">
                                        <Icon icon="mdi:chevron-left" width="24" />
                                    </Button>
                                    <div className="text-center flex-grow">
                                        <div className="text-[1.1rem] font-bold" style={{ color: activePlan.color }}>
                                            {activePlan.name}
                                        </div>
                                        <div className="flex justify-center mt-1 gap-1">
                                            {reversedProducts.map((p, i) => (
                                                <Chip
                                                    key={p.name}
                                                    label={i + 1}
                                                    size="small"
                                                    onClick={() => setActivePlanIndex(i)}
                                                    sx={{
                                                        backgroundColor: i === activePlanIndex ? activePlan.color : '#e0e0e0',
                                                        color: i === activePlanIndex ? 'white' : 'rgba(0,0,0,0.6)',
                                                        height: '20px',
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Button onClick={nextPlan} disabled={products.length <= 1} className="!min-w-0 !p-2">
                                        <Icon icon="mdi:chevron-right" width="24" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Fade>

                    {/* Original Plan Selector */}
                    <div ref={planSelectorRef}>
                        <Card className="mx-auto my-4 !rounded-[10px] !shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <Button onClick={prevPlan} disabled={products.length <= 1} className="!min-w-0">
                                        <Icon icon="mdi:chevron-left" width="28" />
                                    </Button>
                                    <div className="text-center flex-grow py-2">
                                        <div className="text-[1.75rem] font-bold mb-2 leading-tight" style={{ color: activePlan.color }}>
                                            {activePlan.name}
                                        </div>
                                        <div className="flex justify-center gap-1">
                                            {reversedProducts.map((p, i) => (
                                                <Chip
                                                    key={p.name}
                                                    label={i + 1}
                                                    onClick={() => setActivePlanIndex(i)}
                                                    sx={{
                                                        backgroundColor: i === activePlanIndex ? activePlan.color : '#e0e0e0',
                                                        color: i === activePlanIndex ? 'white' : 'rgba(0,0,0,0.6)',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Button onClick={nextPlan} disabled={products.length <= 1} className="!min-w-0">
                                        <Icon icon="mdi:chevron-right" width="28" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Benefits List */}
                    <Card className="mx-auto my-4 !rounded-[10px] !shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                        <CardContent className="p-0">
                            {benefits.map((benefit, index) => {
                                const val = getBenefitValue(benefit);
                                return (
                                    <div key={benefit.name}>
                                        {index > 0 && <div className="h-[1px] bg-gray-200" />}
                                        <div className="p-4 flex flex-col sm:flex-row sm:items-start min-h-[60px]">
                                            <div className="flex-grow min-w-0">
                                                <div
                                                    className={`break-words ${benefit.description ? 'cursor-pointer' : ''}`}
                                                    onClick={() => benefit.description && toggleCollapse(index)}
                                                >
                                                    <div className="flex items-center">
                                                        <span className="text-[1rem] font-medium" dangerouslySetInnerHTML={{ __html: benefit.name }} />
                                                        {benefit.description && (
                                                            <Icon icon={collapsedIndex === index ? "mdi:chevron-up" : "mdi:chevron-down"} width="16" className="ml-2 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                </div>
                                                <Collapse in={collapsedIndex === index}>
                                                    <div className="text-[0.875rem] text-gray-600 mt-2 pl-4 border-l-[3px] border-black/10 ml-4">
                                                        {benefit.description}
                                                    </div>
                                                </Collapse>
                                            </div>

                                            <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center justify-center sm:justify-end min-w-[40px] flex-shrink-0 self-start sm:self-center">
                                                {typeof val === 'boolean' ? (
                                                    val ? (
                                                        <Icon icon="mdi:check-circle" color={activePlan.color} width="24" />
                                                    ) : (
                                                        <Icon icon="mdi:close-circle" className="text-[#F8285A]" width="24" />
                                                    )
                                                ) : (
                                                    <span className="text-[1rem] font-medium text-center">{val}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* CTA */}
                    <Card className="mx-auto my-4 !rounded-[10px] !shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                        <CardContent className="p-4 text-center">
                            <Button
                                variant="contained"
                                fullWidth
                                component={Link}
                                href={activePlan.link}
                                size="large"
                                sx={{
                                    backgroundColor: activePlan.color,
                                    color: 'white',
                                    height: '48px',
                                    borderRadius: '10px',
                                    fontSize: '1rem',
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        backgroundColor: activePlan.color,
                                        opacity: 0.9
                                    }
                                }}
                            >
                                Get Covered Now
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Fine Print */}
            {fineprint && (
                <Card className="mx-auto my-6 !bg-transparent border !border-gray-200 !shadow-none !rounded-[10px]">
                    <CardContent className="p-6">
                        <div className="opacity-70 text-[0.75rem] space-y-2">
                            {fineprint.map((line, i) => (
                                <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

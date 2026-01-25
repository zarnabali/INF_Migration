'use client';

import { PublicLayout } from '@/components/layouts';

interface LegalPageLayoutProps {
    children: React.ReactNode;
    title: string;
    lastUpdated?: string;
    tagline?: string;
}

export const LegalPageLayout = ({ children, title, lastUpdated, tagline }: LegalPageLayoutProps) => {
    return (
        <PublicLayout>
            <div className="overflow-hidden pb-8 pt-8">
                <div className="max-w-[1218px] mx-auto py-0 px-4 md:px-6">
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-full pr-0 sm:pr-10">
                            <h1 className="text-[32px] leading-normal md:text-[40px] md:leading-[50px] font-normal mb-0 text-[#005047] font-['Givonic']">
                                {title}
                            </h1>
                            {lastUpdated && (
                                <p className="text-[22px] leading-[32px] font-normal mb-6 text-[#3A4752]">
                                    Last updated: {lastUpdated}
                                </p>
                            )}
                            {tagline && (
                                <p className="text-[30px] leading-[40px] font-normal text-[#005047] font-['Givonic']">
                                    {tagline}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col justify-center py-1">
                        <div className="legal-policy mx-auto w-full max-w-[800px]">
                            {children}
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    .legal-policy h2 {
                        font-family: 'Givonic', sans-serif;
                        color: #005047; // darkgreen
                        font-size: 30px; // h2 style
                        line-height: 40px;
                        font-weight: 400; // regular
                        margin-bottom: 1rem;
                        padding-top: 4px;
                        padding-bottom: 4px;
                    }
                    .legal-policy p, .legal-policy li {
                        font-size: 14px; // text-14
                        line-height: 28px; // lh-28
                        font-weight: 400; // regular
                        color: #3A4752; // textPrimary
                        text-align: left;
                    }
                    .legal-policy ol,
                    .legal-policy ul {
                        padding-left: 20px;
                    }
                    .legal-policy ul {
                        list-style-type: disc;
                    }
                    .legal-policy ol {
                        list-style-type: decimal;
                    }
                    .legal-policy ol li,
                    .legal-policy ul li {
                        margin-bottom: 5px;
                    }
                    /* Nested lists */
                    .legal-policy ol ol,
                    .legal-policy ol ul,
                    .legal-policy ul ol,
                    .legal-policy ul ul {
                        padding-left: 30px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                    }
                    /* Ensure nested lists have appropriate styles */
                    .legal-policy ul ul {
                        list-style-type: circle;
                    }
                    .legal-policy ol ol {
                        list-style-type: lower-alpha;
                    }
                    .legal-policy strong {
                        font-weight: 600;
                    }
                    .legal-policy a {
                        color: #0078FC; // primary
                        text-decoration: none;
                    }
                    .legal-policy a:hover {
                        text-decoration: underline;
                    }
                `}</style>
            </div>
        </PublicLayout>
    );
};

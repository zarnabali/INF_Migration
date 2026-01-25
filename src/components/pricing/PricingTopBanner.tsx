'use client';

export const PricingTopBanner = () => {
    return (
        <div className="overflow-hidden pb-8 pt-8">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6"> // Changed max-w to match Vue's 1400 if applicable, or keep 1400 from current. Vue uses max-width-1400.
                <div className="banner-wrapper rounded-lg relative flex flex-col items-center justify-center text-white min-h-[550px] p-8 md:p-16 text-center">
                    <div className="relative z-10 w-full">
                        <div className="text-center">
                            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.2] font-medium text-white mb-0">
                                Plans Starting At $80.
                                <br />
                                Protection That Won't Break The Bank.
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .banner-wrapper {
                    background-image: url('/images/pricing/pricing-banner.svg');
                    background-position: left bottom;
                    background-size: cover;
                    background-repeat: no-repeat;
                }

                .banner-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0);
                    z-index: 1;
                    border-radius: inherit;
                }
            `}</style>
        </div>
    );
};

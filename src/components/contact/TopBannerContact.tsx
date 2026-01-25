'use client';

interface TopBannerContactProps {
    title: string;
    image: string;
}

export const TopBannerContact = ({ title, image }: TopBannerContactProps) => {
    return (
        <div className="overflow-hidden pb-8 pt-0">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                <div className="banner-wrapper rounded-lg">
                    {/* CSS Grid Layout for Robustness: Prevents overlap and enforces 50/50 split on desktop */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center h-full">
                        {/* Text Column - Left Aligned */}
                        <div className="flex items-center justify-start mb-8 lg:mb-0">
                            <h1 className="text-[40px] md:text-[56px] lg:text-[56px] leading-[1.2] font-medium text-[#3A4752]">
                                <b className="font-normal">{title}</b>
                            </h1>
                        </div>

                        {/* Image Column - Right Aligned */}
                        <div className="flex items-center justify-center lg:justify-end w-full h-full">
                            <img
                                src={image}
                                alt="banner-right-image"
                                className="banner-image w-full h-auto object-contain lg:object-right max-h-[500px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .banner-wrapper {
                    position: relative;
                    background-position: left bottom;
                    background-size: cover;
                    background-repeat: no-repeat;
                    padding: 32px;
                    min-height: 550px;
                    display: flex;
                    align-items: center;
                }
                
                @media (max-width: 768px) {
                    .banner-wrapper {
                        min-height: 400px;
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

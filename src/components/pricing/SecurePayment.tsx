'use client';

import Image from 'next/image';

const paymentIcons = [
    { img: '/images/payments/visa.svg', alt: 'Visa' },
    { img: '/images/payments/master.svg', alt: 'Mastercard' },
    { img: '/images/payments/american-exp.svg', alt: 'American Express' },
    { img: '/images/payments/discover.svg', alt: 'Discover' },
];

export const SecurePayment = () => {
    return (
        <div className="max-w-[1218px] mx-auto px-4 md:px-6 pt-12">
            <h6 className="text-[20px] text-gray-500 text-center pb-8 font-medium">
                Secured Payment
            </h6>
            <div className="flex flex-wrap items-center gap-6 md:gap-12 justify-center">
                {paymentIcons.map((item) => (
                    <div key={item.alt}>
                        <img src={item.img} alt={item.alt} className="h-8" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export interface PricingPackage {
    tagtext: boolean;
    caption: string;
    subtext: string;
    price: string;
    period: string;
    buttontext: string;
    url: string;
    list: {
        listtitle: string;
        status: boolean;
        icon: boolean;
        disable: boolean;
    }[];
}

export interface TitleSubtitle {
    title: string;
    subtitle: string;
}

export const IndividualPricing: PricingPackage[] = [
    {
        tagtext: false,
        caption: 'Travel Protector Basics',
        subtext: 'Coverage for Savvy Travelers',
        price: '* varies',
        period: ' per trip',
        buttontext: 'Purchase Now',
        url: '/checkout/TPB',
        list: [
            { listtitle: '$25,000 Trip Cancellation', status: false, icon: true, disable: false },
            { listtitle: '$25,000 Trip Interruption', status: false, icon: true, disable: false },
            { listtitle: '$100/day up to $500 Trip Delay', status: false, icon: true, disable: false },
            { listtitle: '$750 Baggage Coverage', status: false, icon: true, disable: false },
            { listtitle: '$15,000 Medical Expenses', status: false, icon: true, disable: false },
        ],
    },
    {
        tagtext: false,
        caption: 'Travel Protector Essentials',
        subtext: 'Coverage for Big Adventures',
        price: '* varies',
        period: ' per trip',
        buttontext: 'Purchase Now',
        url: '/checkout/TPE',
        list: [
            { listtitle: '$25,000 Trip Cancellation', status: false, icon: true, disable: false },
            { listtitle: '$37,500 Trip Interruption', status: false, icon: true, disable: false },
            { listtitle: '$200/day up to $1,000 Trip Delay', status: false, icon: true, disable: false },
            { listtitle: '$1,500 Baggage Coverage', status: false, icon: true, disable: false },
            { listtitle: '$25,000 Medical Expenses', status: false, icon: true, disable: false },
        ],
    },
    {
        tagtext: false,
        caption: 'Travel Protector Choice',
        subtext: 'Coverage for Priceless Journeys',
        price: '* varies',
        period: ' per trip',
        buttontext: 'Purchase Now',
        url: '/checkout/TPC',
        list: [
            { listtitle: '$25,000 Trip Cancellation', status: false, icon: true, disable: false },
            { listtitle: '$37,500 Trip Interruption', status: false, icon: true, disable: false },
            { listtitle: '$200/day up to $1,000 Trip Delay', status: false, icon: true, disable: false },
            { listtitle: '$1,500 Baggage Coverage', status: false, icon: true, disable: false },
            { listtitle: '$25,000 Medical Expenses', status: false, icon: true, disable: false },
        ],
    },
];

export const YearlyPricing: PricingPackage[] = [
    {
        tagtext: false,
        caption: 'Vacation Basics 365',
        subtext: 'Coverage for Practical Travelers',
        price: '$80',
        period: ' Annual',
        buttontext: 'Get Coverage',
        url: '/checkout/TPAB',
        list: [
            { listtitle: '$10,000 Medical Coverage', status: false, icon: true, disable: false },
            { listtitle: '$500,000 Emergency Evacuation', status: false, icon: true, disable: false },
            { listtitle: '$200/day up to $600 Trip Delay', status: false, icon: true, disable: false },
            { listtitle: '$1,000 Baggage Coverage', status: false, icon: true, disable: false },
            { listtitle: '$500 Dental Emergency Coverage', status: false, icon: true, disable: false },
        ],
    },
    {
        tagtext: false,
        caption: 'Vacation Essentials 365',
        subtext: 'Coverage for Savvy Explorers',
        price: '$250',
        period: ' Annual',
        buttontext: 'Get Coverage',
        url: '/checkout/TPAE',
        list: [
            { listtitle: '$20,000 Medical Coverage', status: false, icon: true, disable: false },
            { listtitle: '$500,000 Emergency Evacuation', status: false, icon: true, disable: false },
            { listtitle: '$200/day up to $1,000 Trip Delay', status: false, icon: true, disable: false },
            { listtitle: '$1,500 Trip Cancellation', status: false, icon: true, disable: false },
            { listtitle: '$1,500 Baggage Coverage', status: false, icon: true, disable: false },
        ],
    },
    {
        tagtext: false,
        caption: 'Vacation Choice 365',
        subtext: 'Coverage for Confident Voyagers',
        price: '$516',
        period: ' Annual',
        buttontext: 'Get Coverage',
        url: '/checkout/TPAC',
        list: [
            { listtitle: '$50,000 Medical Coverage', status: false, icon: true, disable: false },
            { listtitle: '$500,000 Emergency Evacuation', status: false, icon: true, disable: false },
            { listtitle: '$200/day up to $1,500 Trip Delay', status: false, icon: true, disable: false },
            { listtitle: '$3,000 Trip Cancellation', status: false, icon: true, disable: false },
            { listtitle: '$2,000 Baggage Coverage', status: false, icon: true, disable: false },
        ],
    },
];

export const AnnualTitleSubtitle: TitleSubtitle = {
    title: 'Travel Confidently Year-Round',
    subtitle: 'Secure your entire year of adventures with one simple plan.',
};

export const IndividualTitleSubtitle: TitleSubtitle = {
    title: 'Every Trip Has A Story.',
    subtitle: 'We Have A Plan For Them All.',
};

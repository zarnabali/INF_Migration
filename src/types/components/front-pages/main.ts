export interface ImageAccordianItem {
    title: string;
    subtitle: string;
    text: string;
}

export interface ImageAccordianType {
    title: string;
    image: any;
    icon: string;
    items: ImageAccordianItem[];
}

export interface TopBannerType {
    title: string;
    image: any;
}

export interface Product {
    name: string;
    color: string;
    link: string;
}

export interface Benefit {
    name: string;
    description: string;
    values: {
        [key: string]: string | boolean;
    };
}

export interface TermsSectionType {
    icon: string;
    text: string;
}

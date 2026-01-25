import type { Config } from "tailwindcss";

const config: Config = {
    important: true,
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                sans: ['var(--font-lato)', 'sans-serif'],
                heading: ['var(--font-givonic)', 'sans-serif'],
                lato: ['var(--font-lato)', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#0078FC',
                    light: '#EDF5FD',
                    dark: '#0056b3',
                },
                secondary: {
                    DEFAULT: '#43CED7',
                    light: '#F2FCFC',
                },
                success: {
                    DEFAULT: '#2CD07E',
                    light: '#EDFDF2',
                },
                error: {
                    DEFAULT: '#F8285A',
                    light: '#FFF0F4',
                },
                warning: {
                    DEFAULT: '#F6C000',
                    light: '#FFFCF0',
                },
                info: {
                    DEFAULT: '#2CABE3',
                    light: '#E4F5FF',
                },
                text: {
                    primary: '#3A4752',
                    secondary: '#768B9E',
                }
            }
        },
    },
    plugins: [],
};
export default config;

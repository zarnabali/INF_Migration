import {
    IconHome,
    IconShield,
    IconFileText,
    IconUsersGroup,
    IconUser,
    IconLayout2,
    IconFiles,
    IconSettings,
} from '@tabler/icons-react';

export interface MenuItem {
    header?: string;
    title?: string;
    icon?: any;
    href?: string;
    children?: MenuItem[];
}

const sidebarItems: MenuItem[] = [
    { header: 'DASHBOARD' },
    {
        title: 'Dashboard',
        icon: IconHome,
        href: '/admin/dashboard',
    },
    { header: 'COVERAGE' },
    {
        title: 'Coverages',
        icon: IconShield,
        href: '/admin/coverages',
    },
    {
        title: 'Quotes',
        icon: IconFileText,
        href: '/admin/quotes',
    },
    { header: 'AFFILIATES' },
    {
        title: 'Affiliates',
        icon: IconUsersGroup,
        href: '/admin/affiliates',
    },
    { header: 'SYSTEM' },
    {
        title: 'Admin Users',
        icon: IconUser,
        href: '/admin/users',
    },
    {
        title: 'Programs',
        icon: IconLayout2,
        href: '/admin/programs',
    },
    {
        title: 'System Documents',
        icon: IconFiles,
        href: '/admin/documents/system',
    },
    { header: 'ACCOUNT' },
    {
        title: 'Account Settings',
        icon: IconSettings,
        href: '/admin/account-settings',
    },
];

export default sidebarItems;

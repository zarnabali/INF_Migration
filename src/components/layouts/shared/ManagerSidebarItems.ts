import {
    IconHome,
    IconShield,
    IconFileText,
    IconFiles,
    IconSettings,
    IconBuilding,
} from '@tabler/icons-react';
import { MenuItem } from './SidebarItems';

const managerSidebarItems: MenuItem[] = [
    { header: 'DASHBOARD' },
    {
        title: 'Dashboard',
        icon: IconHome,
        href: '/manager/dashboard',
    },
    { header: 'MANAGEMENT' },
    {
        title: 'Coverages',
        icon: IconShield,
        href: '/manager/coverages',
    },
    {
        title: 'Quotes',
        icon: IconFileText,
        href: '/manager/quotes',
    },

    { header: 'ORGANIZATION' },
    {
        title: 'Organization',
        icon: IconBuilding,
        href: '/manager/organization',
    }, {
        title: 'Documents',
        icon: IconFiles,
        href: '/manager/documents',
    },


    { header: 'ACCOUNT' },
    {
        title: 'Account Settings',
        icon: IconSettings,
        href: '/manager/settings',
    },
];

export default managerSidebarItems;

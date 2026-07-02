import PAGES from '@repo/constants/pages';
import {
  IconDeviceAnalytics,
  IconLayoutDashboard,
  IconSettings,
  IconShare,
} from '@tabler/icons-react';

export const dashboardNavItems = [
  {
    label: 'Dashboard',
    href: PAGES.dashboard.index,
    icon: IconLayoutDashboard,
  },
  {
    label: 'Analyses',
    href: PAGES.dashboard.analyses,
    icon: IconDeviceAnalytics,
  },
  {
    label: 'Shared reports',
    href: PAGES.dashboard.shared,
    icon: IconShare,
  },
  {
    label: 'Settings',
    href: PAGES.dashboard.settings,
    icon: IconSettings,
  },
];

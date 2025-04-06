import { IconDashboard, IconChartBar, IconUsers } from '@tabler/icons-react';

const SidebarItems = [
  {
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/dashboard',
  },
  {
    title: 'Trading',
    icon: IconChartBar,
    href: '#',
    children: [
      {
        title: 'Daily Review',
        href: '/daily-review',
      },
      {
        title: 'Weekly Review',
        href: '/weekly-review',
      },
      {
        title: 'Trading Insights',
        href: '/trading-insights',
      },
    ],
  },
  {
    title: 'Admin',
    icon: IconUsers,
    href: '#',
    children: [
      {
        title: 'User Management',
        href: '/admin',
      },
      {
        title: 'Settings',
        href: '/admin/settings',
      },
    ],
  },
];

export default SidebarItems; 
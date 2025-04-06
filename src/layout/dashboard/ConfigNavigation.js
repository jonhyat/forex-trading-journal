import { IconChartBar, IconChartPie, IconCurrencyDollar, IconNotebook } from '@tabler/icons-react';

const navigation = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard',
    icon: IconChartPie,
    breadcrumbs: false,
  },
  {
    id: 'trading-insights',
    title: 'Trading Insights',
    type: 'item',
    url: '/trading-insights',
    icon: IconNotebook,
    breadcrumbs: false,
  },
  {
    id: 'performance',
    title: 'Performance',
    type: 'item',
    url: '/performance',
    icon: IconChartBar,
    breadcrumbs: false,
  },
  {
    id: 'trades',
    title: 'Trades',
    type: 'item',
    url: '/trades',
    icon: IconCurrencyDollar,
    breadcrumbs: false,
  },
];

export default navigation; 
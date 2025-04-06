import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const TradingInsights = Loadable(lazy(() => import('../views/trading/TradingInsights')));

const Router = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/trading-insights',
    element: <TradingInsights />,
  },
];

export default Router; 
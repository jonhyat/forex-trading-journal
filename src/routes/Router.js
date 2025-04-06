import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import FullLayout from '../layouts/full/FullLayout';
import BlankLayout from '../layouts/blank/BlankLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Authentication Pages
const Login = lazy(() => import('../views/authentication/Login'));
const Register = lazy(() => import('../views/authentication/Register'));
const Error = lazy(() => import('../views/authentication/Error'));

// Admin Pages
const AdminDashboard = lazy(() => import('../views/admin/AdminDashboard'));

// Trading Pages
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const WeeklyTradeReview = lazy(() => import('../views/trading/WeeklyTradeReview'));
const DailyTradeReview = lazy(() => import('../views/trading/DailyTradeReview'));
const EconomicCalendar = lazy(() => import('../views/trading/EconomicCalendar'));
const TradingInsights = lazy(() => import('../views/trading/TradingInsights'));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="auth/login" element={
          <Suspense fallback={<CircularProgress />}>
            <Login />
          </Suspense>
        } />
        <Route path="auth/register" element={
          <Suspense fallback={<CircularProgress />}>
            <Register />
          </Suspense>
        } />
        <Route path="auth/error" element={
          <Suspense fallback={<CircularProgress />}>
            <Error />
          </Suspense>
        } />
      </Route>

      <Route path="/" element={
        <ProtectedRoute>
          <FullLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={
          <Suspense fallback={<CircularProgress />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="admin" element={
          <ProtectedRoute requireAdmin>
            <Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="weekly-review" element={
          <Suspense fallback={<CircularProgress />}>
            <WeeklyTradeReview />
          </Suspense>
        } />
        <Route path="daily-review" element={
          <Suspense fallback={<CircularProgress />}>
            <DailyTradeReview />
          </Suspense>
        } />
        <Route path="economic-calendar" element={
          <Suspense fallback={<CircularProgress />}>
            <EconomicCalendar />
          </Suspense>
        } />
        <Route path="trading-insights" element={
          <Suspense fallback={<CircularProgress />}>
            <TradingInsights />
          </Suspense>
        } />
        <Route path="*" element={<Navigate to="/auth/error" />} />
      </Route>
    </Routes>
  );
};

export default Router;

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import FullLayout from '../layouts/full/FullLayout';
import BlankLayout from '../layouts/blank/BlankLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Authentication Pages
const Login = lazy(() => import('../views/authentication/Login'));
const Register = lazy(() => import('../views/authentication/Register'));

// Admin Pages
const AdminDashboard = lazy(() => import('../views/admin/AdminDashboard'));

// Trading Pages
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const WeeklyTradeReview = lazy(() => import('../views/trading/WeeklyTradeReview'));
const DailyTradeReview = lazy(() => import('../views/trading/DailyTradeReview'));
const TradingInsights = lazy(() => import('../views/trading/TradingInsights'));

// UI Pages
const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const TypographyPage = lazy(() => import('../views/ui-pages/TypographyPage'));
const Shadow = lazy(() => import('../views/ui-pages/Shadow'));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route path="/auth/login" element={
          <Suspense fallback={<CircularProgress />}>
            <Login />
          </Suspense>
        } />
        <Route path="/auth/register" element={
          <Suspense fallback={<CircularProgress />}>
            <Register />
          </Suspense>
        } />
      </Route>

      <Route path="/" element={
        <ProtectedRoute>
          <FullLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <Suspense fallback={<CircularProgress />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="/sample-page" element={
          <Suspense fallback={<CircularProgress />}>
            <SamplePage />
          </Suspense>
        } />
        <Route path="/daily-review" element={
          <Suspense fallback={<CircularProgress />}>
            <DailyTradeReview />
          </Suspense>
        } />
        <Route path="/weekly-review" element={
          <Suspense fallback={<CircularProgress />}>
            <WeeklyTradeReview />
          </Suspense>
        } />
        <Route path="/ui/typography" element={
          <Suspense fallback={<CircularProgress />}>
            <TypographyPage />
          </Suspense>
        } />
        <Route path="/ui/shadow" element={
          <Suspense fallback={<CircularProgress />}>
            <Shadow />
          </Suspense>
        } />
        <Route path="/trading-insights" element={
          <Suspense fallback={<CircularProgress />}>
            <TradingInsights />
          </Suspense>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <Suspense fallback={<CircularProgress />}>
              <AdminDashboard />
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/auth/404" />} />
      </Route>
    </Routes>
  );
};

export default Router;

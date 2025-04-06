import { Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import MonthlyEarnings from './components/MonthlyEarnings';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import RecentTransactions from './components/RecentTransactions';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Forex Trading Journal Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentTransactions />
        </Grid>
        <Grid item xs={12}>
          <Blog />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;

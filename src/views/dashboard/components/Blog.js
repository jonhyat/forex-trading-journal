import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import { IconChartBar } from '@tabler/icons-react';
import img1 from '../../../assets/images/products/s4.jpg';
import img2 from '../../../assets/images/products/s5.jpg';
import img3 from '../../../assets/images/products/s7.jpg';
import img4 from '../../../assets/images/products/s11.jpg';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Stack } from '@mui/system';

const tradingInsights = [
    {
        title: 'XAUUSD Technical Analysis',
        subheader: 'April 15, 2024',
        photo: img1,
        salesPrice: 1925.50,
        price: 1930.75,
        rating: 4,
    },
    {
        title: 'GBPUSD Market Outlook',
        subheader: 'April 14, 2024',
        photo: img2,
        salesPrice: 1.2650,
        price: 1.2605,
        rating: 3,
    },
    {
        title: 'EURUSD Trading Strategy',
        subheader: 'April 13, 2024',
        photo: img3,
        salesPrice: 1.0850,
        price: 1.0880,
        rating: 5,
    },
    {
        title: 'USDJPY Weekly Forecast',
        subheader: 'April 12, 2024',
        photo: img4,
        salesPrice: 151.50,
        price: 151.20,
        rating: 4,
    },
];

const Blog = () => {
    return (
        <Grid container spacing={3}>
            {tradingInsights.map((insight, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <DashboardCard>
                        <Typography component={Link} to="/">
                            <img src={insight.photo} alt="img" width="100%" />
                        </Typography>
                        <Tooltip title="View Analysis">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                            >
                                <IconChartBar size="16" />
                            </Fab>
                        </Tooltip>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{insight.title}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">Entry: {insight.price}</Typography>
                                    <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                                        Exit: {insight.salesPrice}
                                    </Typography>
                                </Stack>
                                <Rating name="read-only" size="small" value={insight.rating} readOnly />
                            </Stack>
                        </CardContent>
                    </DashboardCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;

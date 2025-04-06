import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const currencyPairs = [
    {
        id: "1",
        name: "XAUUSD",
        post: "Gold vs US Dollar",
        pname: "Bullish",
        priority: "High",
        pbg: "primary.main",
        budget: "+125",
    },
    {
        id: "2",
        name: "GBPUSD",
        post: "British Pound vs US Dollar",
        pname: "Bearish",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "-45",
    },
    {
        id: "3",
        name: "EURUSD",
        post: "Euro vs US Dollar",
        pname: "Neutral",
        priority: "Low",
        pbg: "error.main",
        budget: "+18",
    },
    {
        id: "4",
        name: "USDJPY",
        post: "US Dollar vs Japanese Yen",
        pname: "Bullish",
        priority: "High",
        pbg: "success.main",
        budget: "+87",
    },
];


const ProductPerformance = () => {
    return (

        <DashboardCard title="Currency Pair Performance">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Pair
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Description
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Trend
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    P/L (pips)
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currencyPairs.map((pair) => (
                            <TableRow key={pair.name}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {pair.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {pair.post}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {pair.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: pair.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={pair.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" color={pair.budget.startsWith('+') ? 'success.main' : 'error.main'}>
                                        {pair.budget}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;

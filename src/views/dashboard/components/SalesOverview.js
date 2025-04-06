import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';


const SalesOverview = () => {

    // select
    const [currencyPair, setCurrencyPair] = React.useState('1');

    const handleChange = (event) => {
        setCurrencyPair(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: 'Profit/Loss (pips)',
            data: [15, -8, 25, 12, -5, 18, 10],
        },
        {
            name: 'Trade Volume',
            data: [5, 3, 7, 4, 2, 6, 4],
        },
    ];

    return (

        <DashboardCard title="Hourly Trading Performance" action={
            <Select
                labelId="currency-pair-dd"
                id="currency-pair-dd"
                value={currencyPair}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>XAUUSD</MenuItem>
                <MenuItem value={2}>GBPUSD</MenuItem>
                <MenuItem value={3}>EURUSD</MenuItem>
                <MenuItem value={4}>USDJPY</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;

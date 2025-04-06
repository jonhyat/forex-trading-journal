import { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { IconSearch, IconFilter, IconCalendar } from '@tabler/icons-react';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { BCrumb } from '../../layouts/full/shared/breadcrumb/Breadcrumb';

// Sample economic calendar data
const sampleEvents = [
  {
    id: 1,
    date: '2024-03-20',
    time: '08:30',
    currency: 'USD',
    event: 'Federal Reserve Interest Rate Decision',
    impact: 'High',
    forecast: '5.50%',
    previous: '5.50%',
    actual: '5.50%',
  },
  {
    id: 2,
    date: '2024-03-20',
    time: '10:00',
    currency: 'EUR',
    event: 'ECB President Lagarde Speech',
    impact: 'Medium',
    forecast: '-',
    previous: '-',
    actual: '-',
  },
  {
    id: 3,
    date: '2024-03-20',
    time: '12:30',
    currency: 'GBP',
    event: 'CPI m/m',
    impact: 'High',
    forecast: '0.5%',
    previous: '0.4%',
    actual: '-',
  },
  {
    id: 4,
    date: '2024-03-20',
    time: '14:00',
    currency: 'JPY',
    event: 'Trade Balance',
    impact: 'Medium',
    forecast: '-¥800B',
    previous: '-¥1,200B',
    actual: '-',
  },
  {
    id: 5,
    date: '2024-03-21',
    time: '09:00',
    currency: 'AUD',
    event: 'Employment Change',
    impact: 'High',
    forecast: '25K',
    previous: '20K',
    actual: '-',
  },
  {
    id: 6,
    date: '2024-03-21',
    time: '11:30',
    currency: 'CAD',
    event: 'Retail Sales m/m',
    impact: 'Medium',
    forecast: '0.3%',
    previous: '0.2%',
    actual: '-',
  },
  {
    id: 7,
    date: '2024-03-21',
    time: '13:00',
    currency: 'NZD',
    event: 'GDP q/q',
    impact: 'High',
    forecast: '0.5%',
    previous: '0.4%',
    actual: '-',
  },
  {
    id: 8,
    date: '2024-03-22',
    time: '08:00',
    currency: 'CHF',
    event: 'SNB Monetary Policy Assessment',
    impact: 'High',
    forecast: '-',
    previous: '-',
    actual: '-',
  },
];

const EconomicCalendar = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');
  const [events] = useState(sampleEvents);

  // Filter events based on search term and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.currency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCurrency = currencyFilter === 'all' || event.currency === currencyFilter;
    const matchesImpact = impactFilter === 'all' || event.impact === impactFilter;
    
    return matchesSearch && matchesCurrency && matchesImpact;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCurrencyFilterChange = (event) => {
    setCurrencyFilter(event.target.value);
    setPage(0);
  };

  const handleImpactFilterChange = (event) => {
    setImpactFilter(event.target.value);
    setPage(0);
  };

  // Get unique currencies for filter dropdown
  const currencies = ['all', ...new Set(events.map(event => event.currency))];
  
  // Get impact levels for filter dropdown
  const impactLevels = ['all', 'High', 'Medium', 'Low'];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get impact chip color
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer title="Economic Calendar" description="View upcoming economic events and their impact on forex markets">
      <Breadcrumb title="Economic Calendar" items={BCrumb} />
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search events or currencies..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currencyFilter}
                label="Currency"
                onChange={handleCurrencyFilterChange}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency === 'all' ? 'All Currencies' : currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Impact</InputLabel>
              <Select
                value={impactFilter}
                label="Impact"
                onChange={handleImpactFilterChange}
              >
                {impactLevels.map((impact) => (
                  <MenuItem key={impact} value={impact}>
                    {impact === 'all' ? 'All Impact Levels' : impact}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Tooltip title="Filter events">
              <IconButton color="primary" sx={{ p: 1 }}>
                <IconFilter size={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Calendar view">
              <IconButton color="primary" sx={{ p: 1 }}>
                <IconCalendar size={20} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="economic calendar table">
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Impact</TableCell>
                <TableCell align="right">Forecast</TableCell>
                <TableCell align="right">Previous</TableCell>
                <TableCell align="right">Actual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event) => (
                  <TableRow key={event.id} hover>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(event.date)}
                      </Typography>
                      <Typography variant="body2">
                        {event.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {event.currency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {event.event}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={event.impact} 
                        size="small" 
                        color={getImpactColor(event.impact)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {event.forecast}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {event.previous}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={event.actual !== '-' ? 'bold' : 'normal'}
                        color={event.actual !== '-' ? 'primary' : 'text.secondary'}
                      >
                        {event.actual}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </PageContainer>
  );
};

export default EconomicCalendar; 
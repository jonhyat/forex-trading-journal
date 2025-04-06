import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchEconomicCalendar, getAvailableCurrencies, getImpactLevels } from '../../services/economicCalendarService';
import { IconSearch, IconRefresh } from '@tabler/icons-react';
import PageContainer from '../../components/container/PageContainer';

const EconomicCalendar = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));

  // Format date for API
  const formatDateForApi = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Fetch economic calendar data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const formattedStartDate = formatDateForApi(startDate);
      const formattedEndDate = formatDateForApi(endDate);
      
      // Get currencies to filter by
      const currencies = currencyFilter === 'all' ? [] : [currencyFilter];
      
      const data = await fetchEconomicCalendar(formattedStartDate, formattedEndDate, currencies);
      setEvents(data);
    } catch (err) {
      console.error('Error fetching economic calendar data:', err);
      setError('Failed to load economic calendar data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchData();
  }, [startDate, endDate, currencyFilter]);

  // Filter events based on search term and impact filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.currency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesImpact = impactFilter === 'all' || event.impact === impactFilter;
    
    return matchesSearch && matchesImpact;
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

  const handleRefresh = () => {
    fetchData();
  };

  // Get available currencies for filter dropdown
  const currencies = ['all', ...getAvailableCurrencies()];
  
  // Get impact levels for filter dropdown
  const impactLevels = ['all', ...getImpactLevels()];

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
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Refresh data">
                <IconButton color="primary" onClick={handleRefresh} sx={{ p: 1 }}>
                  <IconRefresh size={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
                  {filteredEvents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="body1" color="text.secondary">
                          No economic events found for the selected criteria.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEvents
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
                      ))
                  )}
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
          </>
        )}
      </Paper>
    </PageContainer>
  );
};

export default EconomicCalendar; 
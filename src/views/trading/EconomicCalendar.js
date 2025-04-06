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
  InputAdornment,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchEconomicCalendar, getAvailableCurrencies, getImpactLevels } from '../../services/economicCalendarService';
import { IconSearch, IconRefresh, IconDownload, IconFilter, IconCalendarStats } from '@tabler/icons-react';
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
  const [currencies, setCurrencies] = useState([]);
  const [impactLevels, setImpactLevels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    highImpact: 0,
    mediumImpact: 0,
    lowImpact: 0,
  });

  // Format date for API
  const formatDateForApi = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Fetch economic calendar data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const start = formatDateForApi(startDate);
      const end = formatDateForApi(endDate);
      const currencyList = currencyFilter === 'all' ? [] : [currencyFilter];
      
      const data = await fetchEconomicCalendar(start, end, currencyList);
      
      // Apply filters
      let filteredData = data;
      
      if (impactFilter !== 'all') {
        filteredData = data.filter(event => event.impact.toLowerCase() === impactFilter.toLowerCase());
      }
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredData = filteredData.filter(event => 
          event.event.toLowerCase().includes(term) || 
          event.currency.toLowerCase().includes(term)
        );
      }
      
      setEvents(filteredData);
      
      // Calculate stats
      const highImpact = filteredData.filter(event => event.impact.toLowerCase() === 'high').length;
      const mediumImpact = filteredData.filter(event => event.impact.toLowerCase() === 'medium').length;
      const lowImpact = filteredData.filter(event => event.impact.toLowerCase() === 'low').length;
      
      setStats({
        totalEvents: filteredData.length,
        highImpact,
        mediumImpact,
        lowImpact,
      });
    } catch (err) {
      setError('Failed to fetch economic calendar data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load available currencies and impact levels
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const availableCurrencies = await getAvailableCurrencies();
        const availableImpactLevels = await getImpactLevels();
        setCurrencies(availableCurrencies);
        setImpactLevels(availableImpactLevels);
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };
    
    loadFilters();
  }, []);

  // Fetch data when filters change
  useEffect(() => {
    fetchData();
  }, [startDate, endDate, currencyFilter, impactFilter]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handle currency filter change
  const handleCurrencyChange = (event) => {
    setCurrencyFilter(event.target.value);
    setPage(0);
  };

  // Handle impact filter change
  const handleImpactChange = (event) => {
    setImpactFilter(event.target.value);
    setPage(0);
  };

  // Get impact chip color
  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  // Export data to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Currency', 'Event', 'Impact', 'Forecast', 'Previous', 'Actual'];
    const csvContent = [
      headers.join(','),
      ...events.map(event => [
        event.date,
        event.time,
        event.currency,
        `"${event.event}"`,
        event.impact,
        event.forecast,
        event.previous,
        event.actual || 'N/A'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `economic_calendar_${formatDateForApi(startDate)}_to_${formatDateForApi(endDate)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageContainer title="Economic Calendar" description="View upcoming economic events and their impact on forex markets">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Economic Calendar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track important economic events that may impact currency markets
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<IconFilter />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Button
                variant="contained"
                startIcon={<IconDownload />}
                onClick={exportToCSV}
                disabled={events.length === 0}
              >
                Export CSV
              </Button>
              <Button
                variant="outlined"
                startIcon={<IconRefresh />}
                onClick={fetchData}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {showFilters && (
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currencyFilter}
                    label="Currency"
                    onChange={handleCurrencyChange}
                  >
                    <MenuItem value="all">All Currencies</MenuItem>
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
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
                    onChange={handleImpactChange}
                  >
                    <MenuItem value="all">All Impact Levels</MenuItem>
                    {impactLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size={20} />
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconCalendarStats size={24} />
                  <Typography variant="h6">Total Events</Typography>
                </Stack>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stats.totalEvents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'error.light' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconCalendarStats size={24} />
                  <Typography variant="h6">High Impact</Typography>
                </Stack>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stats.highImpact}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.light' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconCalendarStats size={24} />
                  <Typography variant="h6">Medium Impact</Typography>
                </Stack>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stats.mediumImpact}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'info.light' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconCalendarStats size={24} />
                  <Typography variant="h6">Low Impact</Typography>
                </Stack>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stats.lowImpact}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="economic calendar table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Impact</TableCell>
                    <TableCell>Forecast</TableCell>
                    <TableCell>Previous</TableCell>
                    <TableCell>Actual</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event) => (
                      <TableRow key={event.id} hover>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>
                          <Chip 
                            label={event.currency} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'primary.light', 
                              color: 'primary.dark',
                              fontWeight: 'bold'
                            }} 
                          />
                        </TableCell>
                        <TableCell>{event.event}</TableCell>
                        <TableCell>
                          <Chip 
                            label={event.impact} 
                            size="small" 
                            color={getImpactColor(event.impact)} 
                          />
                        </TableCell>
                        <TableCell>{event.forecast}</TableCell>
                        <TableCell>{event.previous}</TableCell>
                        <TableCell>
                          {event.actual ? (
                            <Chip 
                              label={event.actual} 
                              size="small" 
                              color={event.actual === event.forecast ? 'success' : 'error'} 
                            />
                          ) : (
                            <Chip 
                              label="Pending" 
                              size="small" 
                              color="default" 
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  {events.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography variant="body1" sx={{ py: 3 }}>
                          No economic events found for the selected criteria.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={events.length}
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
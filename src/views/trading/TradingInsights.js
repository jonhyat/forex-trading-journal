import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const TradingInsights = () => {
  const [tradeData, setTradeData] = useState({
    currencyPair: '',
    tradeType: '',
    entryPrice: '',
    exitPrice: '',
    pips: '',
    date: '',
    time: '',
    notes: '',
    mood: '',
  });

  const [trades, setTrades] = useState([]);
  const [statistics, setStatistics] = useState({
    todayPips: 0,
    todayTrades: 0,
    weeklyPips: 0,
    weeklyTrades: 0,
    winRate: 0,
  });

  const [editingTrade, setEditingTrade] = useState(null);

  const currencyPairs = ['XAUUSD', 'GBPUSD', 'EURUSD', 'USDJPY'];
  const tradeTypes = ['Buy', 'Sell'];
  const moods = ['Excellent', 'Good', 'Neutral', 'Poor', 'Very Poor'];

  useEffect(() => {
    // Load trades from localStorage
    const savedTrades = localStorage.getItem('trades');
    if (savedTrades) {
      const parsedTrades = JSON.parse(savedTrades);
      setTrades(parsedTrades);
      calculateStatistics(parsedTrades);
    }
  }, []);

  const calculateStatistics = (tradesList) => {
    const today = new Date().toISOString().split('T')[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const todayTrades = tradesList.filter(trade => trade.date === today);
    const weeklyTrades = tradesList.filter(trade => new Date(trade.date) >= oneWeekAgo);

    const todayPips = todayTrades.reduce((sum, trade) => sum + Number(trade.pips), 0);
    const weeklyPips = weeklyTrades.reduce((sum, trade) => sum + Number(trade.pips), 0);

    const winningTrades = weeklyTrades.filter(trade => Number(trade.pips) > 0);
    const winRate = weeklyTrades.length > 0 ? (winningTrades.length / weeklyTrades.length) * 100 : 0;

    setStatistics({
      todayPips,
      todayTrades: todayTrades.length,
      weeklyPips,
      weeklyTrades: weeklyTrades.length,
      winRate: Math.round(winRate),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTradeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedTrades;
    
    if (editingTrade) {
      // Update existing trade
      updatedTrades = trades.map(trade => 
        trade.id === editingTrade.id ? { ...tradeData, id: trade.id } : trade
      );
      setEditingTrade(null);
    } else {
      // Add new trade
      const newTrade = {
        ...tradeData,
        id: Date.now(),
      };
      updatedTrades = [...trades, newTrade];
    }
    
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    calculateStatistics(updatedTrades);
    
    // Reset form
    setTradeData({
      currencyPair: '',
      tradeType: '',
      entryPrice: '',
      exitPrice: '',
      pips: '',
      date: '',
      time: '',
      notes: '',
      mood: '',
    });
  };

  const handleDelete = (tradeId) => {
    const updatedTrades = trades.filter(trade => trade.id !== tradeId);
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    calculateStatistics(updatedTrades);
  };

  const handleEdit = (trade) => {
    setEditingTrade(trade);
    setTradeData(trade);
  };

  const handleCancelEdit = () => {
    setEditingTrade(null);
    setTradeData({
      currencyPair: '',
      tradeType: '',
      entryPrice: '',
      exitPrice: '',
      pips: '',
      date: '',
      time: '',
      notes: '',
      mood: '',
    });
  };

  const getMoodColor = (mood) => {
    const colors = {
      'Excellent': 'success',
      'Good': 'info',
      'Neutral': 'warning',
      'Poor': 'error',
      'Very Poor': 'error',
    };
    return colors[mood] || 'default';
  };

  return (
    <PageContainer title="Trading Insights" description="Add your daily trading insights and performance">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <DashboardCard title={editingTrade ? "Edit Trading Insight" : "Add Trading Insight"}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Currency Pair</InputLabel>
                    <Select
                      name="currencyPair"
                      value={tradeData.currencyPair}
                      onChange={handleChange}
                      label="Currency Pair"
                      required
                    >
                      {currencyPairs.map((pair) => (
                        <MenuItem key={pair} value={pair}>
                          {pair}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Trade Type</InputLabel>
                    <Select
                      name="tradeType"
                      value={tradeData.tradeType}
                      onChange={handleChange}
                      label="Trade Type"
                      required
                    >
                      {tradeTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Entry Price"
                    name="entryPrice"
                    value={tradeData.entryPrice}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Exit Price"
                    name="exitPrice"
                    value={tradeData.exitPrice}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pips"
                    name="pips"
                    value={tradeData.pips}
                    onChange={handleChange}
                    required
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    value={tradeData.date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Time"
                    name="time"
                    type="time"
                    value={tradeData.time}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Trading Mood</InputLabel>
                    <Select
                      name="mood"
                      value={tradeData.mood}
                      onChange={handleChange}
                      label="Trading Mood"
                      required
                    >
                      {moods.map((mood) => (
                        <MenuItem key={mood} value={mood}>
                          {mood}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    multiline
                    rows={4}
                    value={tradeData.notes}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      {editingTrade ? "Update Trading Insight" : "Save Trading Insight"}
                    </Button>
                    {editingTrade && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        onClick={handleCancelEdit}
                        fullWidth
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </DashboardCard>

          <Box mt={3}>
            <DashboardCard title="Recent Trades">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date/Time</TableCell>
                      <TableCell>Pair</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Entry</TableCell>
                      <TableCell>Exit</TableCell>
                      <TableCell>Pips</TableCell>
                      <TableCell>Mood</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trades.slice().reverse().map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>{`${trade.date} ${trade.time}`}</TableCell>
                        <TableCell>{trade.currencyPair}</TableCell>
                        <TableCell>{trade.tradeType}</TableCell>
                        <TableCell>{trade.entryPrice}</TableCell>
                        <TableCell>{trade.exitPrice}</TableCell>
                        <TableCell sx={{ color: Number(trade.pips) >= 0 ? 'success.main' : 'error.main' }}>
                          {Number(trade.pips) >= 0 ? '+' : ''}{trade.pips}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={trade.mood}
                            color={getMoodColor(trade.mood)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(trade)}
                            >
                              <IconEdit size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(trade.id)}
                            >
                              <IconTrash size={18} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DashboardCard>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardCard title="Trading Statistics">
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="h6">Today&apos;s Performance</Typography>
                <Typography variant="h4" color={statistics.todayPips >= 0 ? 'success.main' : 'error.main'}>
                  {statistics.todayPips >= 0 ? '+' : ''}{statistics.todayPips} pips
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {statistics.todayTrades} trades executed
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="h6">Weekly Performance</Typography>
                <Typography variant="h4" color={statistics.weeklyPips >= 0 ? 'success.main' : 'error.main'}>
                  {statistics.weeklyPips >= 0 ? '+' : ''}{statistics.weeklyPips} pips
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {statistics.weeklyTrades} trades executed
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="h6">Win Rate</Typography>
                <Typography variant="h4" color="primary">{statistics.winRate}%</Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.weeklyTrades * (statistics.winRate / 100))} winning trades out of {statistics.weeklyTrades}
                </Typography>
              </Paper>
            </Stack>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TradingInsights; 
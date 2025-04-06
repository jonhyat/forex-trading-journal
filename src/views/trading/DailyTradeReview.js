import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { IconPlus, IconTrash, IconEdit, IconCalendar, IconClock } from '@tabler/icons-react';
import PageContainer from '../../components/container/PageContainer';

const DailyTradeReview = () => {
  const [trades, setTrades] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentTrade, setCurrentTrade] = useState({
    image: '',
    pair: '',
    entry: '',
    exit: '',
    profit: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    type: 'long', // 'long' or 'short'
    session: 'london', // 'london', 'newyork', 'tokyo', 'sydney'
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentTrade({ ...currentTrade, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editMode) {
      setTrades(trades.map((trade, index) => 
        index === selectedImage ? currentTrade : trade
      ));
    } else {
      setTrades([...trades, currentTrade]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setSelectedImage(index);
    setCurrentTrade(trades[index]);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = (index) => {
    setTrades(trades.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditMode(false);
    setSelectedImage(null);
    setCurrentTrade({
      image: '',
      pair: '',
      entry: '',
      exit: '',
      profit: '',
      notes: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      type: 'long',
      session: 'london',
    });
  };

  const handleAddNew = () => {
    setEditMode(false);
    setOpenDialog(true);
  };

  // Calculate total profit/loss
  const totalProfit = trades.reduce((sum, trade) => {
    const profit = parseFloat(trade.profit) || 0;
    return sum + profit;
  }, 0);

  // Calculate win rate
  const winningTrades = trades.filter(trade => parseFloat(trade.profit) > 0).length;
  const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;

  // Calculate average profit per trade
  const avgProfit = trades.length > 0 ? totalProfit / trades.length : 0;

  // Group trades by session
  const sessionStats = trades.reduce((acc, trade) => {
    if (!acc[trade.session]) {
      acc[trade.session] = { count: 0, profit: 0 };
    }
    acc[trade.session].count++;
    acc[trade.session].profit += parseFloat(trade.profit) || 0;
    return acc;
  }, {});

  return (
    <PageContainer title="Daily Trade Review" description="Review and analyze your daily trading performance">
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Trades
              </Typography>
              <Typography variant="h3">
                {trades.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: totalProfit >= 0 ? 'success.light' : 'error.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily P/L
              </Typography>
              <Typography variant="h3">
                {totalProfit.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'info.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Win Rate
              </Typography>
              <Typography variant="h3">
                {winRate.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Avg Profit/Trade
              </Typography>
              <Typography variant="h3">
                {avgProfit.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Session Performance */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Performance
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(sessionStats).map(([session, stats]) => (
                  <Grid item xs={12} sm={6} md={3} key={session}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                          {session} Session
                        </Typography>
                        <Typography variant="body2">
                          Trades: {stats.count}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color={stats.profit >= 0 ? 'success.main' : 'error.main'}
                        >
                          P/L: {stats.profit.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Add New Trade Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IconPlus />}
              onClick={handleAddNew}
            >
              Add New Trade
            </Button>
          </Box>
        </Grid>

        {/* Trade Cards */}
        {trades.map((trade, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Box position="relative">
                  <img
                    src={trade.image}
                    alt={`Trade ${index + 1}`}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <Box
                    position="absolute"
                    top={8}
                    right={8}
                    display="flex"
                    gap={1}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(index)}
                      sx={{ bgcolor: 'white' }}
                    >
                      <IconEdit size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(index)}
                      sx={{ bgcolor: 'white' }}
                    >
                      <IconTrash size={18} />
                    </IconButton>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="h6">
                    {trade.pair}
                  </Typography>
                  <Chip 
                    label={trade.type.toUpperCase()} 
                    color={trade.type === 'long' ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
                <Box display="flex" alignItems="center" mt={1} mb={1}>
                  <IconCalendar size={16} style={{ marginRight: '8px' }} />
                  <Typography variant="body2" color="textSecondary">
                    {new Date(trade.date).toLocaleDateString()}
                  </Typography>
                  <IconClock size={16} style={{ marginLeft: '16px', marginRight: '8px' }} />
                  <Typography variant="body2" color="textSecondary">
                    {trade.time}
                  </Typography>
                </Box>
                <Chip 
                  label={trade.session.toUpperCase()} 
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Divider sx={{ my: 1 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Entry: {trade.entry}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Exit: {trade.exit}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant="h6"
                  color={parseFloat(trade.profit) >= 0 ? 'success.main' : 'error.main'}
                  fontWeight="bold"
                  mt={1}
                >
                  Profit: {trade.profit}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {trade.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Trade' : 'Add New Trade'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<IconPlus />}
            >
              Upload Trade Screenshot
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {currentTrade.image && (
              <img
                src={currentTrade.image}
                alt="Trade preview"
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Currency Pair"
                  value={currentTrade.pair}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, pair: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Trade Type</InputLabel>
                  <Select
                    value={currentTrade.type}
                    label="Trade Type"
                    onChange={(e) => setCurrentTrade({ ...currentTrade, type: e.target.value })}
                  >
                    <MenuItem value="long">Long</MenuItem>
                    <MenuItem value="short">Short</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date"
                  type="date"
                  value={currentTrade.date}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, date: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Time"
                  type="time"
                  value={currentTrade.time}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, time: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Trading Session</InputLabel>
                  <Select
                    value={currentTrade.session}
                    label="Trading Session"
                    onChange={(e) => setCurrentTrade({ ...currentTrade, session: e.target.value })}
                  >
                    <MenuItem value="london">London</MenuItem>
                    <MenuItem value="newyork">New York</MenuItem>
                    <MenuItem value="tokyo">Tokyo</MenuItem>
                    <MenuItem value="sydney">Sydney</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Entry Price"
                  value={currentTrade.entry}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, entry: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Exit Price"
                  value={currentTrade.exit}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, exit: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Profit/Loss"
                  value={currentTrade.profit}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, profit: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  value={currentTrade.notes}
                  onChange={(e) => setCurrentTrade({ ...currentTrade, notes: e.target.value })}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editMode ? 'Save Changes' : 'Add Trade'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default DailyTradeReview; 
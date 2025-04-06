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
} from '@mui/material';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import PageContainer from '../../components/container/PageContainer';

const WeeklyTradeReview = () => {
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
    });
  };

  const handleAddNew = () => {
    setEditMode(false);
    setOpenDialog(true);
  };

  return (
    <PageContainer title="Weekly Trade Review" description="Review and analyze your weekly trading performance">
      <Grid container spacing={3}>
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
                <Typography variant="h6" mt={2}>
                  {trade.pair}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Entry: {trade.entry}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Exit: {trade.exit}
                </Typography>
                <Typography
                  variant="body1"
                  color={trade.profit >= 0 ? 'success.main' : 'error.main'}
                  fontWeight="bold"
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
            <TextField
              label="Currency Pair"
              value={currentTrade.pair}
              onChange={(e) => setCurrentTrade({ ...currentTrade, pair: e.target.value })}
              fullWidth
            />
            <TextField
              label="Entry Price"
              value={currentTrade.entry}
              onChange={(e) => setCurrentTrade({ ...currentTrade, entry: e.target.value })}
              fullWidth
            />
            <TextField
              label="Exit Price"
              value={currentTrade.exit}
              onChange={(e) => setCurrentTrade({ ...currentTrade, exit: e.target.value })}
              fullWidth
            />
            <TextField
              label="Profit/Loss"
              value={currentTrade.profit}
              onChange={(e) => setCurrentTrade({ ...currentTrade, profit: e.target.value })}
              fullWidth
            />
            <TextField
              label="Notes"
              value={currentTrade.notes}
              onChange={(e) => setCurrentTrade({ ...currentTrade, notes: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
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

export default WeeklyTradeReview; 
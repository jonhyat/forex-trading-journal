import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Chip,
  Stack,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconUserPlus,
  IconChartBar,
  IconUsers,
  IconCurrencyDollar,
  IconActivity,
} from '@tabler/icons-react';
import PageContainer from '../../components/container/PageContainer';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTrades: 0,
    averageProfit: 0,
  });

  useEffect(() => {
    // Simulate fetching users from API
    const mockUsers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 5 === 0 ? 'admin' : 'user',
      status: i % 3 === 0 ? 'inactive' : 'active',
      joinDate: new Date(2024, 0, i + 1).toLocaleDateString(),
      trades: Math.floor(Math.random() * 100),
      profit: (Math.random() * 1000 - 500).toFixed(2),
    }));

    setUsers(mockUsers);
    setStats({
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(user => user.status === 'active').length,
      totalTrades: mockUsers.reduce((sum, user) => sum + user.trades, 0),
      averageProfit: (mockUsers.reduce((sum, user) => sum + parseFloat(user.profit), 0) / mockUsers.length).toFixed(2),
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (userId) => {
    // Implement user deletion logic
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditUser = (userId) => {
    // Implement user editing logic
    console.log('Edit user:', userId);
  };

  const handleAddUser = () => {
    // Implement user addition logic
    console.log('Add new user');
  };

  return (
    <PageContainer title="Admin Dashboard" description="Manage users and view statistics">
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconUsers size={40} color="#1976d2" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {stats.totalUsers}
                    </Typography>
                    <Typography color="text.secondary">Total Users</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconActivity size={40} color="#2e7d32" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {stats.activeUsers}
                    </Typography>
                    <Typography color="text.secondary">Active Users</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconChartBar size={40} color="#ed6c02" />
                  <Box>
                    <Typography variant="h4" component="div">
                      {stats.totalTrades}
                    </Typography>
                    <Typography color="text.secondary">Total Trades</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconCurrencyDollar size={40} color="#9c27b0" />
                  <Box>
                    <Typography variant="h4" component="div">
                      ${stats.averageProfit}
                    </Typography>
                    <Typography color="text.secondary">Avg. Profit</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<IconUserPlus size={20} />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>

        <Box sx={{ px: 2, pb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Trades</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={user.role === 'admin' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === 'active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.trades}</TableCell>
                    <TableCell>
                      <Typography
                        color={parseFloat(user.profit) >= 0 ? 'success.main' : 'error.main'}
                      >
                        ${user.profit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditUser(user.id)}
                        color="primary"
                      >
                        <IconEdit size={20} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUser(user.id)}
                        color="error"
                      >
                        <IconTrash size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </PageContainer>
  );
};

export default AdminDashboard; 
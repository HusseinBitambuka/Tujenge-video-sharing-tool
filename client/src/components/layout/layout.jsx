import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function Layout({ children }) {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      {user && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: user ? '240px' : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
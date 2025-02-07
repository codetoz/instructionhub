import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Button from '../common/Button';
import { useAuthStore } from '../../services/auth/store';
import TheConstrain from './TheConstrain';

function TheHeader() {
  const { user, login, logout } = useAuthStore();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
      <TheConstrain>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            InstructionHUB
          </Typography>
          <Box>
            {!user && (
              <Button
                label="Sign In"
                color="inherit"
                onClick={handleLogin}
                sx={{ color: '#fff' }}
              />
            )}
            {user && (
              <Button
                label="Sign Out"
                color="inherit"
                onClick={handleLogout}
                sx={{ color: '#fff' }}
              />
            )}
          </Box>
        </Toolbar>
      </TheConstrain>
    </AppBar>
  );
}

export default TheHeader;

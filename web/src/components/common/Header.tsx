import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
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
    </AppBar>
  );
}

export default Header;
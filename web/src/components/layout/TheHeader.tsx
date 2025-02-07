import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Button from '../common/Button';
import { useAuthStore } from '../../services/auth/store';
import TheConstrain from './TheConstrain';

function TheHeader() {
  const { user, login, logout, isAuthenticating, isSigningOut } =
    useAuthStore();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.default' }}>
      <TheConstrain>
        <Toolbar sx={{ px: '0 !important' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            InstructionHUB
          </Typography>
          <Box>
            {!user && (
              <>
                <Button
                  label="Sign In"
                  color="inherit"
                  onClick={handleLogin}
                  sx={{ color: '#fff', mr: 1 }}
                  disabled={isAuthenticating}
                />
                <Button
                  label="Sign Up"
                  color="inherit"
                  onClick={handleLogin}
                  sx={{ color: '#fff' }}
                  disabled={isAuthenticating}
                />
              </>
            )}
            {user && (
              <Button
                label="Sign Out"
                color="inherit"
                onClick={handleLogout}
                sx={{ color: '#fff' }}
                disabled={isSigningOut}
              />
            )}
          </Box>
        </Toolbar>
      </TheConstrain>
    </AppBar>
  );
}

export default TheHeader;

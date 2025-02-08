import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useAuthStore } from '../../services/auth/store';
import TheConstrain from './TheConstrain';
import Button from '../common/Button';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

function TheHeader() {
  const navigate = useNavigate();
  const { user, login, logout, isAuthenticating, isSigningOut } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogin = () => {
    login();
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleOpenProfile = () => {
    handleMenuClose();
    if (user && user.username) {
      navigate(`/profile/${user.username}`);
    } else {
      navigate('/');
    }
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
              <Box>
                <IconButton onClick={handleMenuOpen} color="inherit" sx={{ color: '#fff' }}>
                  <Avatar sx={{ width: 24, height: 24 }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleOpenProfile}>
                    <ListItemIcon>
                      <PersonOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Open Profile" />
                  </MenuItem>
                  <MenuItem onClick={handleLogout} disabled={isSigningOut}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </TheConstrain>
    </AppBar>
  );
}

export default TheHeader;
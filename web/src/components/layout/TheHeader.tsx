import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { PersonOutline, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TheConstrain from './TheConstrain';
import Button from '../common/Button';
import { login, logout } from '../../logic/auth/service';
import { useClientUser } from '../../logic/auth/react-hooks';

function TheHeader() {
  const navigate = useNavigate();
  const user = useClientUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    if (!user) return;
    handleMenuClose();
    if (user && user.username) {
      navigate(`/${user.username}`);
    } else {
      navigate('/');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.default' }}>
      <TheConstrain>
        <Toolbar sx={{ px: '0 !important' }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                opacity: '0.8',
              },
              '&:active': {
                transform: 'translateY(4px)',
              },
              color: 'text.primary',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            Instruction<span style={{ fontWeight: 'bold' }}>HUB</span>
          </Typography>
          <Box>
            {!user && (
              <>
                <Button
                  label="Sign In"
                  color="inherit"
                  onClick={login}
                  sx={{ color: '#fff', mr: 1 }}
                />
                <Button
                  label="Sign Up"
                  color="inherit"
                  onClick={login}
                  sx={{ color: '#fff' }}
                />
              </>
            )}
            {user && (
              <Box>
                <IconButton
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ color: '#fff' }}
                >
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
                      <PersonOutline
                        sx={{ color: 'text.secondary' }}
                        fontSize="small"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Open Profile" />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout
                        sx={{ color: 'text.secondary' }}
                        fontSize="small"
                      />
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

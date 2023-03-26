import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Skeleton } from '@mui/material';
import SettingsDialog from './Settings';
import { useUser } from '@/store/user';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUser((select) => select.current);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsClick = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  console.log(location);

  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 100 }}>
      <AppBar position="relative">
        <Toolbar>
          {location.pathname != '/' ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user ? user.name : <Skeleton variant="text" width={250} />}
            <Typography>
              {user ? user.group : <Skeleton variant="text" width={200} />}
            </Typography>
          </Typography>
          <IconButton color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SettingsDialog open={settingsOpen} onClose={handleSettingsClose} />
    </Box>
  );
}

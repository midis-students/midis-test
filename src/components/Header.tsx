import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Skeleton } from '@mui/material';
import SettingsDialog from './Settings';

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsClick = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 100 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width={250} />
            <Typography>
              <Skeleton variant="text" width={200} />
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

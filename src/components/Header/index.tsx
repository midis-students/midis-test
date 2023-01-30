import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from '@/components/Settings';
import { useAppSelector } from '@/store/hooks';
import { Skeleton } from '@mui/material';

export default function Header() {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const userState = useAppSelector((selector) => selector.user);

  const loading = userState.status !== 'fulfilled';
  const user = userState.data!;

  const handleSettingsClick = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 100 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loading ? <Skeleton variant="text" width={250} /> : user.name}
            <Typography>
              {loading ? <Skeleton variant="text" width={200} /> : user.group}
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

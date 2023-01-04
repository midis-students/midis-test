import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from '@/components/Settings';

export default function Header() {

	const [settingsOpen, setSettingsOpen] = React.useState(false);

	const handleSettingsClick = () => setSettingsOpen(true);
	const handleSettingsClose = () => setSettingsOpen(false);

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						Дамир Лутфрахманов
						<Typography>П-38</Typography>
					</Typography>
					<IconButton color="inherit" onClick={handleSettingsClick}>
						<SettingsIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<SettingsDialog open={settingsOpen} onClose={handleSettingsClose}/>
		</Box>
	);
}

import { Box, Button, Container, Divider, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '100%',
        display: 'flex',
        p: 1,

        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '33%',
        }}>
        <img src="splash.png" />
        <TextField label="Логин" />
        <TextField label="Пароль" type="password" />
        <Divider />
        <Button variant="contained" onClick={onClick}>
          Войти
        </Button>
      </Box>
    </Container>
  );
}

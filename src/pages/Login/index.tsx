import React from 'react';
import { useIsAuth } from '@/store/authorization';
import { useNavigate } from 'react-router-dom';
import { Api } from '@/lib/api';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import Page from '@/components/Page';

export default function LoginPage() {
  const [form, setForm] = React.useState({
    login: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, []);

  const onClick = async () => {
    try {
      await Api.instance.login(form.login, form.password);
      navigate('/');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name.replace('midis-', '');
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Page
      sx={{
        height: '100vh',
        display: 'flex',
        p: 1,

        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '33%',
        }}
      >
        <img src="./MIDIS.svg" alt="баннер" />
        {error != '' ? <Typography color="red">{error}</Typography> : null}
        <TextField label="Логин" name="midis-login" onChange={onInput} />
        <TextField
          label="Пароль"
          type="password"
          name="midis-password"
          onChange={onInput}
        />
        <Divider />
        <Button variant="contained" onClick={onClick}>
          Войти
        </Button>
      </Box>
    </Page>
  );
}

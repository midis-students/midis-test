import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import Page from '@/components/Page';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/Auth';
import { getUser } from '@/store/slices/User';

export default function LoginPage() {
  const [form, setForm] = React.useState({
    login: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const isAuth = !!useAppSelector((select) => select.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, []);

  const onClick = async () => {
    try {
      await dispatch(loginUser(form)).unwrap();
      navigate('/');
    } catch (error: any) {
      setError(error);
    }
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name.replace('midis-', '')]: event.target.value,
    }));
  };

  return (
    <Page
      sx={{
        height: '100%',
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
        <img src="/splash.png" alt="баннер" />
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

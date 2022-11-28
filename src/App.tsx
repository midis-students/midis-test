import React from 'react';
import { Box, Container, Link, Paper, Stack, Typography } from '@mui/material';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', p: 1, gap: 1 }}>
        <Paper
          sx={{
            width: '80%',
            p: 1,
          }}>
          задачи
        </Paper>
        <Paper
          sx={{
            marginLeft: 'auto',
            width: '20%',
            p: 1,
            overflowY: 'auto',
          }}>
          <Typography>Список задач</Typography>
          <Stack
            sx={{
              p: 1,
            }}
            spacing={1}>
            {Array.from({ length: 50 }).map((_, i) => (
              <Link href="#" key={i}>
                Задача #{i}
              </Link>
            ))}
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default App;

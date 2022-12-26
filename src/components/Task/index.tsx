import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export default function Task() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get('task') || 0;

  return (
    <Box sx={{ p: 1 }}>
      <Box>
        <Typography variant="h4" color="primary">
          Задача {id}
        </Typography>
        <Typography>Верно ли...?</Typography>
        <Button variant="contained" color="success">
          Проверить
        </Button>
      </Box>
    </Box>
  );
}

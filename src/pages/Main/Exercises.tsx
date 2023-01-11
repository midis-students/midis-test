import { useNavigate } from 'react-router-dom';
import { useIsAdmin } from '@/store/slices/User';
import { setData, useExercises } from '@/store/slices/Exercies';
import { useAppDispatch } from '@/store/hooks';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useService } from '../../hooks/useService';

export default function Exercises() {
  const { data, fetch } = useService(window.api.getExercises, []);
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const items = useExercises();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (data) {
      dispatch(setData(data));
    }
  }, [data]);

  return (
    <>
      <Typography variant="h4">Список тем</Typography>
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, 256px)',
          gridTemplateRows: 'repeat(auto-fill, 256px)',
        }}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{ p: 1, position: 'relative', height: '100%' }}
          >
            <CardContent sx={{ height: '85%' }}>
              <Typography color="text.secondary" gutterBottom>
                {item.type}
              </Typography>
              <Typography variant="h5" color="primary">
                {item.name}
              </Typography>
              <Typography>Задач: {item.tasks.length}</Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'end', width: '100%' }}>
              {isAdmin ? (
                <Button
                  size="small"
                  color="warning"
                  onClick={() => navigate('/edit/' + item.id)}
                >
                  Редактировать
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => navigate('/exercise/' + item.id)}
                >
                  Открыть
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}

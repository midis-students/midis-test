import { useNavigate } from 'react-router-dom';
import { useIsAdmin } from '@/store/slices/User';
import {
  addExercise,
  setExercises,
  useExercises,
} from '@/store/slices/Exercies';
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
import { useService } from '@/hooks/useService';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function Exercises() {
  const { data } = useService(window.api.getExercises, []);
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const items = useExercises();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (data) {
      dispatch(setExercises(data));
    }
  }, [data]);

  const createNew = async () => {
    const { data } = await window.api.createExercise('Новая тема');
    if (data?.id) {
      dispatch(addExercise(data));
      navigate('/edit/' + data.id);
    }
  };

  const size = '256px';

  return (
    <>
      <Typography variant="h4">Список тем</Typography>
      <Box sx={{ overflow: 'auto', maxHeight: '80vh', p: 1 }}>
        <Box
          sx={{
            height: '100%',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: `repeat(auto-fill, ${size})`,
            gridTemplateRows: `repeat(auto-fill, ${size})`,
          }}
        >
          {isAdmin && (
            <Card sx={{ width: size, height: size }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  color="primary"
                  style={{ marginTop: '33%' }}
                  onClick={createNew}
                >
                  <AddIcon style={{ fontSize: 48 }} />
                </IconButton>
              </CardContent>
            </Card>
          )}

          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                p: 1,
                position: 'relative',
                width: size,
                height: size,
              }}
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
      </Box>
    </>
  );
}

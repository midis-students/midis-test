import React from 'react';
import Header from '@/components/Header';
import {
  Container,
  Card,
  Typography,
  Stack,
  Link,
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { data } from '@/lib/data';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {setData, useExercises} from '@/store/slices/Exercies';
import Page from '@/components/Page';

export default function MainPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewAs = searchParams.get('as');

  const items = useExercises();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setData(data));
  }, []);

  return (
    <>
      <Header />
      <Page>
        <Typography variant="h4">Алгоритмы</Typography>
        <Box
          sx={{
            height: '100%',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, 256px)',
            gridTemplateRows: 'repeat(auto-fill, 256px)',
          }}>
          {items.map((item) => (
            <Card key={item.id} sx={{ p: 1, position: 'relative', height: '100%' }}>
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
                {viewAs == 'admin' ? (
                  <Button size="small" color="warning" onClick={() => navigate('/edit/' + item.id)}>
                    Редактировать
                  </Button>
                ) : (
                  <Button size="small" onClick={() => navigate('/exercise/' + item.id)}>
                    Открыть
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Page>
    </>
  );
}

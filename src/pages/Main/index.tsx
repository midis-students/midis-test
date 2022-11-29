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
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Exercise = {
  name: string;
  id: number;
  tasks: number;
  type: string;
};

export default function MainPage() {
  const [items, setItems] = React.useState<Exercise[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setItems([
      {
        name: 'Условия',
        id: 0,
        tasks: 30,
        type: 'Вводная',
      },
      {
        name: 'Циклы',
        id: 1,
        tasks: 10,
        type: 'Практическая',
      },
      {
        name: 'Сортировка',
        id: 2,
        tasks: 15,
        type: 'Самостаятельная',
      },
      {
        name: 'Игры',
        id: 3,
        tasks: 5,
        type: 'Дополнительная',
      },
    ]);
  }, []);

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{ height: '100%', display: 'flex', p: 1, gap: 1, flexDirection: 'column', mt: 1 }}>
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
                <Typography>Задач: {item.tasks}</Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'end', width: '100%' }}>
                <Button size="small" onClick={() => navigate('/exercise/' + item.id)}>
                  Открыть
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}

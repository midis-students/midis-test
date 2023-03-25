import Loader from '@/components/Loader';
import { useAllExerciseQuery } from '@/hooks/query/exercise';
import { Exercise } from '@/lib/api/type';
import { useUser } from '@/store/user';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const size = '256px';

export default function ExercisesList() {
  const [taskInput, setTaskInput] = useState<number>();
  const { data, isLoading, isSuccess } = useAllExerciseQuery();
  const navigate = useNavigate();

  const goToTask = () => {
    navigate('/task/' + taskInput);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          id="outlined-controlled"
          label="К задаче №"
          variant="outlined"
          size="small"
          type="number"
          value={taskInput}
          onChange={(e) => setTaskInput(+e.target.value)}
        />
        <Button onClick={goToTask}>Перейти</Button>
      </Box>
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
          {isLoading ? (
            <Loader />
          ) : (
            isSuccess &&
            data.map((item) => <ExerciseCard key={item.id} item={item} />)
          )}
        </Box>
      </Box>
    </>
  );
}

type ExerciseCardProps = {
  item: Exercise;
};

function ExerciseCard({ item }: ExerciseCardProps) {
  const navigate = useNavigate();
  const isAdmin = useUser((select) => select.isAdmin());

  const onClick = () => {
    const url = isAdmin ? '/edit' : '/exercise';
    const taskId = item.tasks.at(-1)?.id;
    navigate(`${url}/${item.id}/${taskId}`);
  };

  return (
    <Card
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
        <Button
          size="small"
          color={isAdmin ? 'warning' : 'primary'}
          onClick={onClick}
        >
          {isAdmin ? 'Редактировать' : 'Открыть'}
        </Button>
      </CardActions>
    </Card>
  );
}

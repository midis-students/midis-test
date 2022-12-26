import Header from '@/components/Header';
import Task from '@/components/Task';
import { Container, Paper, Typography, Stack, Link } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Page from '@/components/Page';

const tasks = Array.from({ length: 50 }).map((_, i) => ({
  name: Math.random().toString(36),
  completed: Math.random() > 0.5,
}));

export default function ExercisePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('task') || 0;

  return (
    <>
      <Header />
      <Page sx={{ height: '100%', display: 'flex', p: 1, gap: 1, flexDirection: 'row' }}>
        <Paper
          sx={{
            width: '80%',
            p: 1,
          }}>
          <Task />
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
            {tasks.map((task, i) => (
              <Link
                key={i}
                underline="hover"
                onClick={() => navigate('?task=' + i)}
                sx={{ cursor: 'pointer', alignItems: 'center', display: 'flex', gap: 1 }}
                color={id == i ? '#9c27b0' : task.completed ? '#2e7d32' : 'primary'}>
                {task.name} {task.completed && <CheckIcon />}
              </Link>
            ))}
          </Stack>
        </Paper>
      </Page>
    </>
  );
}

import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorProps } from '@/pages/Edit/editors/index';
import {
  setExercises,
  useExercise,
  useExercises,
} from '@/store/slices/Exercies';
import { useService } from '@/hooks/useService';
import { useAppDispatch } from '@/store/hooks';
import React from 'react';
import TaskCreator from '@/pages/Edit/editors/TaskCreator';

export default function EditorTasks({ id }: EditorProps) {
  const { tasks } = useExercise(id);
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const createTask = async () => {
    setDialogVisible(true);
  };

  return (
    <>
      <TaskCreator
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        exerciseId={id}
      />
      <Typography variant={'h4'}>Задачи</Typography>
      <Button
        variant={'contained'}
        onClick={createTask}
        startIcon={<AddIcon />}
      >
        Добавить
      </Button>
      <List sx={{ bgcolor: 'background.paper' }}>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding divider>
            <ListItemButton>
              <ListItemText>{task.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

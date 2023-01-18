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
import { setData, useExercise, useExercises } from '@/store/slices/Exercies';
import { useService } from '@/hooks/useService';
import { useAppDispatch } from '@/store/hooks';
import React from 'react';

export default function EditorTasks({ id }: EditorProps) {
  const { tasks } = useExercise(id);
  const { data, fetch } = useService(window.api.getExercises, [], false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (data) {
      dispatch(setData(data));
    }
  }, [data]);

  const createTask = async () => {
    await window.api.createTask(id);
    await fetch();
  };

  return (
    <>
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

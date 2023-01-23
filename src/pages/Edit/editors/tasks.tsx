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
import { useExercise } from '@/store/slices/Exercies';
import React from 'react';
import TaskCreator from './TaskCreator';
import TaskEditor from './TaskEditor';

export default function EditorTasks({ id }: EditorProps) {
  const { tasks } = useExercise(id);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [currentTaskEdit, setCurrentTaskEdit] = React.useState(-1);

  const createTask = async () => {
    setDialogVisible(true);
  };

  return (
    <>
      <TaskCreator
        open={dialogVisible}
        onClose={(id) => {
          setCurrentTaskEdit(id);
          setDialogVisible(false);
        }}
        exerciseId={id}
      />
      <TaskEditor
        taskId={currentTaskEdit}
        onClose={() => setCurrentTaskEdit(-1)}
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
            <ListItemButton onClick={()=>setCurrentTaskEdit(task.id)}>
              <ListItemText>{task.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

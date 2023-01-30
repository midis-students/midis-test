import React from 'react';
import { TaskCreatorEditor } from '@/pages/Edit/editors/TaskCreator';
import { useAppDispatch } from '@/store/hooks';
import { useDraftTask, taskActions } from '@/store/slices/Task';
import { Box, TextField } from '@mui/material';
import metaImage from './image.png';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const editor: TaskCreatorEditor = () => {
  const task = useDraftTask();
  const dispatch = useAppDispatch();

  const setName = (event: InputEvent) =>
    dispatch(taskActions.updateName(event.target.value));
  const setQuery = (event: InputEvent) =>
    dispatch(taskActions.updateQuery(event.target.value));

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <TextField value={task.name} label="Название" onInput={setName} />
      <TextField
        value={task.query}
        label="Вопрос"
        onInput={setQuery}
        multiline
      />
    </Box>
  );
};

editor.meta = {
  type: 'radio',
  img: metaImage,
  description: 'Выбор одного варианта',
  title: 'Radio кнопки',
};

export default editor;

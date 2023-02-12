import { useAppDispatch } from '@/store/hooks';
import { useDraftTask, taskActions } from '@/store/slices/Task';
import { Box, TextField } from '@mui/material';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const editor = () => {
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

export default editor;

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Box,
  Divider,
} from '@mui/material';
import { EditorContext, EditorValue } from '@/TaskEditors/context';
import { ApiTaskResponse } from '@/lib/Service.type';

type EditorProps = {
  onClose: () => void;
  task: ApiTaskResponse;
  editor: JSX.Element;
};

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState<EditorValue>({
    data: props.task,
    onSave: async () => false,
  });

  const onSave = async () => {
    if (await value.onSave()) {
      console.log(value.data);
      props.onClose();
    }
  };

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.task.name}
          </Typography>
          <Button autoFocus color="inherit" onClick={onSave}>
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 2 }}>
          <EditorContext.Provider value={{ value, setValue }}>
            {props.editor}
          </EditorContext.Provider>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Button color="error" variant="contained">
          Удалить
        </Button>
      </Container>
    </>
  );
}

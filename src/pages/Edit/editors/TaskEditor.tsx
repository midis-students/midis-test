import React from 'react';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { useService } from '@/hooks/useService';
import taskEditors from '@/TaskEditors';

type TaskEditorProps = {
  taskId: number;
  onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskEditor(props: TaskEditorProps) {
  const {
    data: task,
    loading,
    fetch,
    args,
  } = useService(window.api.getTask, [{ id: props.taskId }], false);

  const [Editor, setEditor] = React.useState<JSX.Element | null>(null);

  React.useEffect(() => {
    if (props.taskId > -1) {
      fetch(args, (data) => {
        if (data) {
          taskEditors.forEach((taskEditor) => {
            if (taskEditor.meta.type === data.type) {
              setEditor(taskEditor());
            }
          });
        }
      });
    }
  }, [props.taskId]);

  return (
    <Dialog
      open={props.taskId != -1}
      onClose={props.onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      {loading || !task ? (
        <Container
          maxWidth="xl"
          sx={{
            height: '100%',
            display: 'flex',
          }}
        >
          <CircularProgress sx={{ margin: 'auto' }} size={64} />
        </Container>
      ) : (
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
                {task.name}
              </Typography>
              <Button autoFocus color="inherit" onClick={props.onClose}>
                Сохранить
              </Button>
            </Toolbar>
          </AppBar>
          <Container>{Editor}</Container>
        </>
      )}
    </Dialog>
  );
}

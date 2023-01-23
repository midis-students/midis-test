import React from 'react';
import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { useService } from '@/hooks/useService';

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
  const { data, loading, fetch } = useService(
    window.api.getExercises,
    [{ id: props.taskId }],
    false
  );

  React.useEffect(() => {
    if (props.taskId > -1) {
      fetch();
    }
  }, [props.taskId]);

  const task = data?.at(0) as NonNullable<typeof data>[0];

  return (
    <Dialog
      open={props.taskId != -1}
      onClose={props.onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      {loading || !task ? (
        <CircularProgress />
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
        </>
      )}
    </Dialog>
  );
}

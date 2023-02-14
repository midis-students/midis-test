import React from 'react';
import { Dialog } from '@mui/material';

import { useService } from '@/hooks/useService';
import taskEditors from '@/TaskEditors';
import { taskActions, useDraftTask } from '@/store/slices/Task';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Transition from '@/components/Transition';
import Loader from '@/components/Loader';
import Editor from './task/editor';

type TaskEditorProps = {
  taskId: number;
  onClose: () => void;
};

export default function TaskEditor(props: TaskEditorProps) {
  const service = useService(window.api.getTask, [{ id: props.taskId }], false);
  const [editor, setEditor] = React.useState<JSX.Element | null>(null);
  const isForceJson = useAppSelector(
    (selector) => selector.settings.forceJsonEditor
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (props.taskId > -1) {
      service.fetch(service.args, (data) => {
        if (data) {
          for (const TaskEditor of taskEditors) {
            const type = isForceJson ? 'json' : data.type;
            if (TaskEditor.type === type) {
              dispatch(taskActions.setDraftTask(data));
              setEditor(<TaskEditor.Editor />);
              return;
            }
          }
        }
      });
    }
  }, [props.taskId]);

  const serviceLoading = service.loading || !service.data;
  const task = service.data as NonNullable<typeof service.data>;

  return (
    <Dialog
      open={props.taskId != -1}
      onClose={props.onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      {serviceLoading ? (
        <Loader />
      ) : (
        <Editor onClose={props.onClose} task={task} editor={editor!} />
      )}
    </Dialog>
  );
}

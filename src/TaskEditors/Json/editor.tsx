import React from 'react';
import { Box, Typography } from '@mui/material';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import { taskActions, useDraftTask } from '@/store/slices/Task';
import { EditorContext } from '../context';
import { useAppDispatch } from '@/store/hooks';

const editor = () => {
  const task = useDraftTask();
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = React.useRef<JSONEditor>();
  const { setValue } = React.useContext(EditorContext);

  React.useEffect(() => {
    setValue((prev) => ({
      ...prev,
      onSave: async () => {
        if (editor.current) {
          const json = editor.current.get();
          json.data = JSON.stringify(json.data);
          await window.api.updateTask(task.id, json);
          return true;
        }
        return false;
      },
    }));

    if (ref.current) {
      const options = {};
      editor.current = new JSONEditor(ref.current, options);
      const data = structuredClone(task);
      data.data = JSON.parse(data.data);
      editor.current!.set(data);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography>Raw Editor</Typography>
      <div ref={ref} />
    </Box>
  );
};

export default editor;

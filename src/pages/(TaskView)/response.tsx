import { Task } from '@/lib/api/type';
import { Modules } from '@/modules';
import { Box, Typography } from '@mui/material';
import { Suspense } from 'react';

type TaskResponseProps = {
  task: Task;
};

export function TaskResponse({ task }: TaskResponseProps) {
  const module = Modules[task.type];

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      {module ? (
        <Suspense fallback={'загрузка...'}>
          <module.response data={task.data} />
        </Suspense>
      ) : (
        <Typography variant="subtitle2">
          <strong>"{task.type}"</strong> type not implemented
        </Typography>
      )}
    </Box>
  );
}

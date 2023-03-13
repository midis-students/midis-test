import Loader from '@/components/Loader';
import { useTaskQuery } from '@/hooks/query/task';
import { Task } from '@/lib/api/type';
import { useSettings } from '@/store/settings';
import { Box, Typography, Button, Stack, Divider } from '@mui/material';
import ViewPayload from '@/components/PayloadView';
import { TaskResponse } from './response';
import { useState } from 'react';
import { TaskViewContext, TaskViewResponse } from './context';

type TaskViewId = {
  id: number;
};

export default function TaskView(props: TaskViewId) {
  const { data, isLoading, isSuccess } = useTaskQuery(props.id);
  const [response, setResponse] = useState<TaskViewResponse>({});

  const clickResponse = () => {
    console.log(response);
  };

  const Payloads = () => {
    if (!isSuccess) return null;
    if (data.data.payloads.length === 0) return null;

    return (
      <Stack direction="row" spacing={1} sx={{ maxHeight: '64vh' }}>
        {data.data.payloads.map((payload) => (
          <>
            <ViewPayload
              key={'payload-'+payload}
              payload={payload}
              width={(1 / data.data.payloads.length) * 100 + '%'}
              height="auto"
            />
          </>
        ))}
      </Stack>
    );
  };

  return (
    <TaskViewContext.Provider value={{ response, setResponse }}>
      <Box
        sx={{
          p: 1,
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          minHeight: '10vh',
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          isSuccess && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" color="primary">
                {data.name}
              </Typography>
              <Typography>{data.query}</Typography>
              <Payloads />
              <TaskResponse task={data} />
              <Button
                variant="contained"
                color="success"
                onClick={clickResponse}
              >
                Проверить
              </Button>
              <RawTask task={data} />
            </Box>
          )
        )}
      </Box>
    </TaskViewContext.Provider>
  );
}

function RawTask({ task }: { task: Task }) {
  const viewRawTask = useSettings((select) => select.viewRawTask);

  if (!viewRawTask) return null;

  return (
    <>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <pre>
        <code>{JSON.stringify(task, null, 2)}</code>
      </pre>
    </>
  );
}

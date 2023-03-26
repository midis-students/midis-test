import Loader from '@/components/Loader';
import { useTaskQuery } from '@/hooks/query/task';
import { Task } from '@/lib/api/type';
import { useSettings } from '@/store/settings';
import { Box, Typography, Button, Divider } from '@mui/material';
import { TaskResponse } from './response';
import { useState } from 'react';
import { TaskViewContext, TaskViewResponse } from './context';
import { Api } from '@/lib/api';
import PayloadList from '@/components/PayloadList';
import { useSnackbar } from 'notistack';

type TaskViewId = {
  id: number;
};

export default function TaskView(props: TaskViewId) {
  const { data, isLoading, isSuccess } = useTaskQuery(props.id);
  const { enqueueSnackbar } = useSnackbar();
  const [response, setResponse] = useState<TaskViewResponse>({});

  const clickResponse = async () => {
    try {
      const { isCorrect } = await Api.instance.request<{ isCorrect: boolean }>(
        'answer/' + props.id,
        {
          method: 'POST',
          body: {
            answer: response,
          },
        }
      );
      if (isCorrect) {
        enqueueSnackbar('Правильно!', {
          variant: 'success',
        });
      } else {
        enqueueSnackbar('Не правильно!', {
          variant: 'warning',
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, { variant: 'error' });
      }
    }
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
              <PayloadList payloads={data.payloads} />
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

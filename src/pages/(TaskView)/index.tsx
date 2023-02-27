import Loader from '@/components/Loader';
import { useTaskQuery } from '@/hooks/query/task';
import { Task } from '@/lib/api/type';
import { useSettings } from '@/store/settings';
import { Box, Typography, Button, Stack, Divider } from '@mui/material';
import ViewPayload from '@/components/PayloadView';

type TaskViewId = {
  id: number;
};

export default function TaskView(props: TaskViewId) {
  const { data, isLoading, isSuccess } = useTaskQuery(props.id);

  const Payloads = () => {
    if (!isSuccess) return null;
    if (data.data.payloads.length === 0) return null;

    return (
      <Stack direction="row" spacing={1} sx={{ maxHeight: '64vh' }}>
        {data.data.payloads.map((payload) => (
          <>
            <ViewPayload
              key={payload}
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
    <Box sx={{ p: 1, whiteSpace: 'pre-wrap', overflow: 'auto' }}>
      {isLoading ? (
        <Loader />
      ) : (
        isSuccess && (
          <Box>
            <Typography variant="h4" color="primary">
              {data.name}
            </Typography>
            <Typography>{data.query}</Typography>
            <Payloads />
            <Button variant="contained" color="success">
              Проверить
            </Button>
            <RawTask task={data} />
          </Box>
        )
      )}
    </Box>
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

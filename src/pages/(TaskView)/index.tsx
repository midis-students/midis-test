import Loader from '@/components/Loader';
import { useTaskQuery } from '@/hooks/query/task';
import { Api } from '@/lib/api';
import { Task } from '@/lib/api/type';
import { useSettings } from '@/store/settings';
import { Box, Typography, Button, Stack, Divider, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

type TaskViewId = {
  id: number;
};

export default function TaskView(props: TaskViewId) {
  const [payloads, setPayloads] = useState<string[]>([]);
  const { data, isLoading, isSuccess } = useTaskQuery(props.id);
  const viewRawTask = useSettings((select) => select.viewRawTask);

  useEffect(() => {
    const fetchPayloads = async () => {
      setPayloads([]);
      if (isSuccess) {
        for (const payload of data.data.payloads) {
          Api.instance.payload
            .getImage(payload)
            .then((image) => setPayloads((prev) => [...prev, image]));
        }
      }
    };
    fetchPayloads();
  }, [props.id]);

  return (
    <Box sx={{ p: 1 }}>
      {isLoading ? (
        <Loader />
      ) : (
        isSuccess && (
          <Box>
            <Typography variant="h4" color="primary">
              {data.name}
            </Typography>
            <Typography>{data.query}</Typography>
            {payloads.length ? (
              <Stack direction="row" spacing={1}>
                {payloads.map((payload, index) => (
                  <img
                    src={payload}
                    key={index}
                    width={(1 / data.data.payloads.length) * 100 + '%'}
                  />
                ))}
              </Stack>
            ) : null}
            <Button variant="contained" color="success">
              Проверить
            </Button>
            {viewRawTask ? <RawTask task={data} /> : null}
          </Box>
        )
      )}
    </Box>
  );
}

function RawTask({ task }: { task: Task }) {
  return (
    <>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <pre>
        <code>{JSON.stringify(task, null, 2)}</code>
      </pre>
    </>
  );
}

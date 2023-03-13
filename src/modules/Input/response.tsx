import { useForm } from '@/hooks/useForm';
import { TaskData } from '@/lib/api/type';
import { useTaskView } from '@/pages/(TaskView)/context';
import { FormControl, TextField } from '@mui/material';
import { useEffect } from 'react';

type ResponseProps = {
  data: TaskData;
};

export default function Response({ data }: ResponseProps) {
  const { response, setResponse } = useTaskView();

  useEffect(() => {
    if (!('value' in response)) {
      setResponse({ value: '' });
    }
  }, []);

  return (
    <FormControl>
      <TextField
        label={data.placeholder}
        value={response.value}
        onChange={(e) => setResponse({ value: e.target.value })}
      />
    </FormControl>
  );
}

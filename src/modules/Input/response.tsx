import { useForm } from '@/hooks/useForm';
import { useTaskView } from '@/pages/(TaskView)/context';
import { FormControl, TextField } from '@mui/material';
import { useEffect } from 'react';

type ResponseProps = {
  data: {
    value: string;
  };
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
        value={response.value}
        onChange={(e) => setResponse({ value: e.target.value })}
      />
    </FormControl>
  );
}

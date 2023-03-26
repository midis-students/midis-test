import { useTaskView } from '@/pages/(TaskView)/context';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Response() {
  const { setResponse } = useTaskView();
  const [value, setValue] = useState('');

  useEffect(() => {
    setResponse({ value });
  }, [value]);

  return (
    <FormControl>
      <FormLabel>Введите ответ</FormLabel>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
    </FormControl>
  );
}

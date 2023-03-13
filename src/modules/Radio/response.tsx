import { TaskData } from '@/lib/api/type';
import { useTaskView } from '@/pages/(TaskView)/context';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect } from 'react';

type ResponseProps = {
  data: TaskData;
};

export default function Response({ data }: ResponseProps) {
  const { response, setResponse } = useTaskView();

  useEffect(() => {
    if (!('variants' in response)) {
      setResponse({
        variants: Array.from({ length: data.options.length }).fill(false),
      });
    }
  }, []);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    if ('name' in event.target && typeof event.target.name === 'string') {
      const variant = Number(event.target.name.replace('variant-', ''));
      setResponse((prev) => {
        prev.variants[variant] = checked;
        return prev;
      });
    }
  };

  const control = data.subtype === 'radio' ? <Radio /> : <Checkbox />;

  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Варианты ответов</FormLabel>
      <RadioGroup aria-labelledby="radio-buttons-group-label">
        {data.options.map((option, index) => (
          <FormControlLabel
            name={'variant-' + index.toString()}
            value={index}
            control={control}
            label={option.text}
            onChange={handleChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

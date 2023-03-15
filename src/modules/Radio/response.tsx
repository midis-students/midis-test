import { TaskData } from '@/lib/api/type';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type ResponseProps = {
  data: TaskData;
};

export default function Response({ data }: ResponseProps) {
  const control = data.subtype === 'radio' ? <Radio /> : <Checkbox />;

  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Варианты ответов</FormLabel>
      <RadioGroup aria-labelledby="radio-buttons-group-label">
        {data.options.map((option, index) => (
          <FormControlLabel
            value={index}
            control={control}
            label={option.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

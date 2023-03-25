import { Variant } from '@/lib/api/type';
import { useTaskView } from '@/pages/(TaskView)/context';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect } from 'react';
import { ResponseProps } from '@/modules/type';

type RadioProps = {
  variants: Variant[];
};

export default function Response({ data }: ResponseProps<RadioProps>) {
  const { response, setResponse } = useTaskView();

  useEffect(() => {
    if (!('variants' in response)) {
      setResponse({
        variant: [],
      });
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent<Element, Event>) => {
    if ('name' in event.target && typeof event.target.name === 'string') {
      const variant = event.target.name.replace('variant-', '');
      setResponse([variant]);
    }
  };

  const control = <Radio />;

  const { variants } = data;

  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">Варианты ответов</FormLabel>
      <RadioGroup aria-labelledby="radio-buttons-group-label">
        {variants.map((option, index) => (
          <FormControlLabel
            name={'variant-' + option.id.toString()}
            value={index}
            control={control}
            label={option.label}
            onChange={handleChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

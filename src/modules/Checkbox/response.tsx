import {Variant} from '@/lib/api/type';
import {useTaskView} from '@/pages/(TaskView)/context';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
} from '@mui/material';
import {useEffect} from 'react';
import {ResponseProps} from "@/modules/type";

type CheckboxProps = {
    variants: Variant[];
};

export default function Response({data}: ResponseProps<CheckboxProps>) {
    const {response, setResponse} = useTaskView();

    useEffect(() => {
        if (!('variants' in response)) {
            setResponse({
                variants: data,
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

    const control = <Checkbox/>;

    const {variants} = data;

    return (
        <FormControl>
            <FormLabel id="radio-buttons-group-label">Варианты ответов</FormLabel>
            <RadioGroup aria-labelledby="radio-buttons-group-label">
                {variants.map((option, index) => (
                    <FormControlLabel
                        name={'variant-' + index.toString()}
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

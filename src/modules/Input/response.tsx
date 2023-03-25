
import {useTaskView} from '@/pages/(TaskView)/context';
import {FormControl, TextField} from '@mui/material';
import {useEffect} from 'react';

export default function Response() {
    const {response, setResponse} = useTaskView();

    useEffect(() => {
        if (!('value' in response)) {
            setResponse({value: ''});
        }
    }, []);

    return (
        <FormControl>
            <TextField
                value={response.value}
                onChange={(e) => setResponse({value: e.target.value})}
            />
        </FormControl>
    );
}

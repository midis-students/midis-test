import { Box, Button, TextField, Typography } from '@mui/material';
import { EditorProps } from '@/pages/Edit/editors/index';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useExercise } from '@/store/slices/Exercies';
import useForm from '@/hooks/useForm';

export default function EditorMain({ id }: EditorProps) {
  const exercise = useExercise(id);
  const form = useForm({ name: exercise.name, type: exercise.type });

  const save = async () => {
    const result = await window.api.updateExercise({
      id,
      ...form.data,
    });
    console.log(result);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <Typography variant={'h4'}>Основные параметры</Typography>
      <TextField label={'Название'} {...form.input('name')} />
      <TextField label={'Категория'} {...form.input('type')} />
      <Box sx={{ display: 'flex', gap: '1em' }}>
        <Button
          startIcon={<SaveIcon />}
          color={'primary'}
          variant={'contained'}
          size={'medium'}
          onClick={save}
        >
          Сохранить
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color={'error'}
          variant={'contained'}
          size={'medium'}
        >
          Удалить
        </Button>
      </Box>
    </Box>
  );
}

import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { Api } from '@/lib/api';

export function useAllExerciseQuery() {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryFn: () => Api.instance.exercise.getAll(),
    staleTime: 5000,
    queryKey: ['exercise-all'],
    onError: (error) => {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });
}

export function useExerciseQuery(id: number) {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryFn: () => Api.instance.exercise.get(id),
    queryKey: ['exercise-id', id],
    onError: (error) => {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });
}

export function useExerciseResult(id: number) {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryFn: () => Api.instance.exercise.result(id),
    staleTime: 5000,
    queryKey: ['exercise-id', id, 'result'],
    onError: (error) => {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });
}

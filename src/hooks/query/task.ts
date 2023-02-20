import { Api } from '@/lib/api';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';

export function useTaskQuery(id: number) {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryFn: () => Api.instance.task.get(id),
    staleTime: 5000,
    queryKey: ['task-id', id],
    onError: (error) => {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });
}

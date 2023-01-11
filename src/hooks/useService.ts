import React from 'react';
import { ApiResponse } from '@/lib/Service.type';

export function useService<
  T extends (...args: any) => Promise<ApiResponse<any>>
>(service: T, args: Parameters<T>, auto = true) {
  type ServiceReturnType = Awaited<ReturnType<T>>;

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<ServiceReturnType['data'] | null>(
    null
  );

  const fetch = async (args: any[]) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await service.bind(window.api)(...args);
      if ('error' in response) {
        setError(response.message);
      } else {
        setData(response.data);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!loading && auto) {
      fetch(args);
    }
  }, []);

  return { loading, error, data, fetch };
}

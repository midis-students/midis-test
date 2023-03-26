import { lazy } from 'react';

export const RadioModule = {
  meta: {
    name: 'Выбор один из нескольких ответов',
  },
  response: lazy(() => import('./response')),
};

import { lazy } from 'react';

export const RadioModule = {
  meta: {
    name: 'Выбор нескольких ответов',
  },
  response: lazy(() => import('./response')),
};

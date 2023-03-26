import { lazy } from 'react';

export const CheckboxModule = {
  meta: {
    name: 'Выбор нескольких ответов',
  },
  response: lazy(() => import('./response')),
};

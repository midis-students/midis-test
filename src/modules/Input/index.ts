import { lazy } from 'react';

export const InputModule = {
  meta: {
    name: 'Поле ввода ответа',
  },
  response: lazy(() => import('./response')),
};

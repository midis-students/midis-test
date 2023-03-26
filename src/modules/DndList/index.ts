import { lazy } from 'react';

export const DndListModule = {
  meta: {
    name: 'Сортировка перетаскивание',
  },
  response: lazy(() => import('./response')),
};

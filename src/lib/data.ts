import type { Exercise } from './type';

export const data: Exercise[] = [
  {
    name: 'Условия',
    id: 0,
    tasks: [
      {
        data: {},
        exercise: 0,
        id: 0,
        name: '',
        query: '',
        type: 0,
      },
    ],
    type: 'Вводная',
  },
  {
    name: 'Циклы',
    id: 1,
    tasks: Array.from({ length: 15 }),
    type: 'Практическая',
  },
  {
    name: 'Сортировка',
    id: 2,
    tasks: Array.from({ length: 20 }),
    type: 'Самостаятельная',
  },
  {
    name: 'СТРАДАНИЯ',
    id: 3,
    tasks: Array.from({ length: 5000 }),
    type: 'Дополнительная',
  },
];

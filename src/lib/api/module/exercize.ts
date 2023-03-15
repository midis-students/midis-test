import { Exercise } from '../type';
import { Api } from '@/lib/api';

export class ExerciseModule {
  constructor(private api: Api) {}

  async getAll() {
    type ExerciseList = Array<Exercise & { tasks: number }>;

    return this.api.request<ExerciseList>('exercise', {
      method: 'GET',
    });
  }
  async get(id: number) {
    return this.api.request<Exercise>('exercise', {
      method: 'GET',
      query: {
        id: id.toString(),
      },
    });
  }
}

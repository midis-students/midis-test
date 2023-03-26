import { Exercise, TaskWithAnswer } from '../type';
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
    return this.api.request<Exercise>('exercise/' + id, {
      method: 'GET',
    });
  }

  async result(id: number) {
    return this.api.request<
      Omit<Exercise, 'tasks'> & { tasks: TaskWithAnswer[] }
    >('exercise/' + id + '/result', {
      method: 'GET',
    });
  }
}

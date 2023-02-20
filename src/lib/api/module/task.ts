import { Api } from '../';
import { Task } from '../type';
export class TaskModule {
  constructor(private api: Api) {}

  get(id: number) {
    return this.api.request<Task>('task', {
      method: 'GET',
      query: {
        id: id.toString(),
      },
    });
  }
}

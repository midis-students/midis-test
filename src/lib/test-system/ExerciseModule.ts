import { TaskModule } from './TaskModule';

export class ExerciseModule {
  title = '';
  type = '';
  tasks: TaskModule<unknown>[] = [];

  id = '';

  setId(id: string) {
    this.id = id;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  addTasks(...tasks: TaskModule<unknown>[]) {
    this.tasks.push(...tasks);
    return this;
  }
}

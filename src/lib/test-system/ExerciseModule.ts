import { TaskModule } from './TaskModule';

export class ExerciseModule<T> {
  title = '';
  type = '';
  tasks: TaskModule<unknown>[] = [];

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

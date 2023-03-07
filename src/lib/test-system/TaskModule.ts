import { TesterModule } from './module';

export class TaskModule<T> {
  title = '';
  query = '';
  tester: TesterModule<T>;
  payloads: number[] = [];

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setQuery(query: string) {
    this.query = query;
    return this;
  }

  setTester(tester: TesterModule<T>) {
    this.tester = tester;
    return this;
  }

  addPayload(...payload: number[]) {
    this.payloads.push(...payload);
    return this;
  }
}

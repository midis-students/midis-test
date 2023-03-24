import { Payload } from '@/entity/Payload';
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

  addPayload(...payloads: number[]) {
    this.payloads.push(...payloads);
    return this;
  }

  async resolvePayloads() {
    const ids: Payload[] = [];
    for (const payload of this.payloads) {
      const p = await Payload.findOne({ where: { id: payload } });
      if (p) ids.push(p);
    }
    return ids;
  }
}

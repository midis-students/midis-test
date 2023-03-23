import { Payload } from '@/entity/Payload';
import { TesterModule } from './module';

export class TaskModule<T> {
  title = '';
  query = '';
  tester: TesterModule<T>;
  payloads: Payload[] = [];

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
    this.payloads.push(...(payloads as unknown as Payload[]));
    //this.resolvePayloads(...payloads).then(res => this.payloads.push(...res));
    return this;
  }

  async resolvePayloads(...payloads: number[]) {
    const ids: Payload[] = [];
    for (const payload of payloads) {
      const p = await Payload.findOne({ where: { id: payload } });
      if (p) ids.push(p);
    }
    return ids;
  }
}

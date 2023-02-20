import { Api } from '@/lib/api';
import { Payload } from '../type';
export class PayloadModule {
  constructor(private api: Api) {}

  async getImage(id: number) {
    const data = await this.api.request<Payload>('payload', {
      method: 'GET',
      query: {
        id: id.toString(),
      },
    });

    return data.blob;
  }

  updatePayload(id: number, blob: string) {
    return this.api.request('payload', {
      method: 'PATCH',
      body: {
        id: id,
        blob,
      },
    });
  }
}

import { Api } from '..';
import { Profile } from '../type';
import { useUser } from '@/store/user';

export class ProfileModule {
  constructor(private api: Api) {}

  async get() {
    const user = await this.api.request<Profile>('profile', {
      method: 'GET',
    });
    useUser.setState({ current: user });
  }
}

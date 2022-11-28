import { singleton } from 'tsyringe';
import { makeObservable, observable } from 'mobx';

@singleton()
export class ProfileService {
  @observable user: Profile = {
    name: 'Test User',
    group: 'П-38',
  };

  constructor() {
    makeObservable(this);
  }
}

export type Profile = {
  name: string;
  group: string;
};

import { Expose } from 'class-transformer';
import { Role } from '@/entity/User';

export class Variant<T> {
  id = '';
  @Expose({ groups: [Role.Teacher, Role.Admin] })
  value: T;
  label = '';

  constructor() {
    this.id = Math.floor(Math.random() * 0xffff).toString(36);
  }

  setValue(value: T) {
    this.value = value;
    return this;
  }

  setLabel(label: string) {
    this.label = label;
    return this;
  }
}

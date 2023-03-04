import { Expose } from 'class-transformer';
import { Role } from '@/entity/User';

export class Variant<T> {
  id = '';
  @Expose({ groups: [Role.Teacher, Role.Admin] })
  value: T;
  label = '';
}

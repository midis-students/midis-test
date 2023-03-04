import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  /// Midis ID
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  group: string;

  @Column({
    type: 'varchar',
    default: Role.Student,
  })
  role: Role;
}

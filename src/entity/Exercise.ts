import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Task } from './Task';

@Entity()
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  type: string;

  @OneToMany(() => Task, task => task.exercise)
  @JoinTable()
  tasks: Task[];
}

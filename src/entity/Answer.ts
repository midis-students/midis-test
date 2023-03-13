import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';
import { User } from './User';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Task, task => task)
  @JoinColumn()
  task: Task;

  @OneToMany(() => User, user => user)
  @JoinColumn()
  user: User;

  @Column()
  isCorrect: boolean;
}

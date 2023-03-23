import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';
import { User } from './User';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, task => task, { onDelete: 'CASCADE' })
  @JoinColumn()
  task: Task;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  isCorrect: boolean;
}

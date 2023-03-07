import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Payload } from '@/entity/Payload';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, exercise => exercise.tasks)
  @JoinColumn()
  exercise: Exercise;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: '' })
  query: string;

  @Column({ type: 'text' })
  data: string;

  @ManyToOne(() => Payload, payload => payload.id)
  @JoinColumn()
  payloads: number[];
}

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Payload } from '@/entity/Payload';
import { Exclude } from 'class-transformer';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, exercise => exercise.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  exercise: Exercise;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: '' })
  query: string;

  @Exclude()
  @Column({ type: 'text' })
  data: string;

  @ManyToMany(() => Payload, payload => payload.id, { cascade: true })
  @JoinTable()
  payloads: Payload[];
}

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @OneToMany(() => Task, (task) => task.exercise)
  @JoinTable()
  tasks: Task[];
}

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.tasks)
  @JoinColumn()
  exercise: Exercise;

  @Column()
  name: string;

  @Column({ default: "" })
  query: string;

  @Column({ default: "" })
  type: string;

  @Column({ default: "{}" })
  data: string;
}

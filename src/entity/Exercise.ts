import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable, JoinColumn} from 'typeorm';

@Entity()
export class Exercise extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: string;

	@OneToMany(() => Task, task => task.exercise)
	@JoinTable()
	tasks: Task[];

}

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
	query: string;

	@Column()
	type: string;

	@Column()
	data: string;
}
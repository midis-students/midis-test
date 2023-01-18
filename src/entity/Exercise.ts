import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	JoinTable,
	JoinColumn,
} from 'typeorm';
import {Exclude} from 'class-transformer';
import {Task} from './Task';

@Entity()
export class Exercise extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({default: ''})
	type: string;

	@OneToMany(() => Task, (task) => task.exercise)
	@JoinTable()
	tasks: Task[];
}

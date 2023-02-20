import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Task} from './Task';

@Entity()
export class Answer extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Exercise, (exercise) => exercise.tasks)
	@JoinColumn()
	task: Task;

	@Column()
	name: string;

	@Column()
	type: string;

	@Column({ default: "" })
	query: string;

	@Column({ type: "json" })
	data: DataInput | DataCheckBox | DataRaw
}
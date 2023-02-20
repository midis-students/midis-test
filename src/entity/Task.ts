import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Exercise} from './Exercise';

export interface DataCheckBox extends Data {
	subtype: "checkbox" | "radio";
	options:Array<
		{
			text:string;
			score: number;
		}
	>
}


export interface DataInput extends Data {
	placeholder: string;
	answer: string;
}


export interface DataDragAndDrop extends Data {
	blocks:Array<{
		text:string;
		answer: boolean;
	}>
}


export interface DataRaw extends Data {
	text: string,
	objects: Record<string, DataInput | DataCheckBox | DataDragAndDrop>
}

export interface Data {
	payloads:Array<number>
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

	@Column()
	type: string;

	@Column({ default: "" })
	query: string;

	@Column({ type: "json" })
	data: DataInput | DataCheckBox | DataRaw | DataDragAndDrop
}
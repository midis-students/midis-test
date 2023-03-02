import { Expose } from 'class-transformer';
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Exercise} from './Exercise';

export class Data {
	type: "radio" | "input" | "richtext";
	payloads?:Array<number>;
}

export class DataCheckBoxAnswer {
	text:string;
	score: number;
}

export class DataCheckBox extends Data {
	subtype: "checkbox" | "radio" | "select";
	options:Array<DataCheckBoxAnswer>
}

export class DataInput extends Data {
	placeholder: string;
	answer: string;
}


// export class DataDragAndDrop extends Data {
// 	blocks:Array<{
// 		text:string;
// 		answer: boolean;
// 	}>
// }

export class DataRichText extends Data {
	text: string;
	objects: Record<string, Data>;
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

	@Column({ type: "text" })
	data: string;
	
	get json(): Data {
		return JSON.parse(this.data);
	};
}
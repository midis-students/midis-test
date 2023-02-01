import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Exercise} from './Exercise';

type DataRadio = {
	options:[
		{
			text:string;
			score: number;
		}
	]
}

type DataText = {
	placeholder: string;
	answer: string;
	eqmode: 0 | 1 | 2 | 3; // RegEx | Без арфографии | Может немного ошибится, но получит пол бала | Точный ввод
	in_image: {
		x: number;
		y: number;
		width: number;
		height: number;
	}
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
}

/*

Пример Query:

const query = `
1. Ввести {{options:[{text:"Стороны прямоугольника",id:1},{text:"Стороны прямоугольника",id:2}]}}
2. Включить 2+2={{text:{placeholder:"5?", id:3}}} // 2+2=5?
`


Пример Answers:
{
	id1:{
		score: 2
	},
	id2:{
		score:0
	},
	id3:{
		answer: "4";
		eqmode: 0 | 1 | 2 | 3; // RegEx | Без арфографии | Может немного ошибится, но получит пол бала | Точный ввод
	}
}


*/

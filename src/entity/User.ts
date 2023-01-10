import {BaseEntity, Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import {Exclude} from 'class-transformer';

export enum Role {
	Student = 'STUDENT',
	Teacher = 'TEACHER',
	Admin = 'ADMIN'
}

@Entity()
export class User extends BaseEntity {
	/// Midis ID
	@PrimaryColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	group: string;

	@Exclude()
	@Column()
	midis_token: string;

	@Column({
		type: 'varchar',
		default: Role.Student
	})
	role: Role;
}


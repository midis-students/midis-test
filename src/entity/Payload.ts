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

export enum PayloadType {
    Image = "IMAGE",
    File = "FILE",
}

@Entity()
export class Payload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    default: PayloadType.File,
  })
  type: PayloadType;

	@Column({
		type: "blob",
		transformer:{
			to: (value: string) => Buffer.from(value),
			from: (value: Buffer) => value.toString(),
		}
	})
	blob: string;
}
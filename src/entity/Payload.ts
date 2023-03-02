import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

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
    type:"text"
  })
  description: string;

	@Column({
		type: "mediumblob",
	})
	blob: Blob;
}
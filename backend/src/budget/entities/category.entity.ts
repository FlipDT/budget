import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Operation } from "./operation.entity";

@Entity()
export class Category{

@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@OneToMany(() => Operation, (operation) => operation.category)
operations: Operation[];

}
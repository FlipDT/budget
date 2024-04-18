import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Operation } from "./operation.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Category{

@PrimaryGeneratedColumn()
@IsNotEmpty()
id: number;

@Column()
@IsNotEmpty()
name: string;

@OneToMany(() => Operation, (operation) => operation.category)
operations: Operation[];

}
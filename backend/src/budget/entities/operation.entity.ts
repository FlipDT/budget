import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Category } from "./category.entity";
import { IsDate, IsDecimal, IsNotEmpty, IsString } from "class-validator";

@Entity()
export class Operation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsDecimal()
    amount: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    description: string;

    @CreateDateColumn()
    @IsNotEmpty()
    @IsDate()
    createdDate: Date;

    @Column()
    @IsNotEmpty()
    userId: number;

    @Column()
    @IsNotEmpty()
    categoryId: number;

    @ManyToOne(() => User, (user) => user.operations)
    user: User;

    @ManyToOne(() => Category, (category) => category.operations)
    category: Category;
}
import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Operation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Timestamp;

    @Column()
    userId: number;

    @Column()
    categoryId: number;

    @ManyToOne(() => User, (user) => user.operations)
    user: User;

    @ManyToOne(() => Category, (category) => category.operations)
    category: Category;
}
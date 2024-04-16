import { Operation } from "src/budget/entities/operation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    date: Timestamp;

// precision définit le nombre total de chiffre avant ou après la virgules, scale définit le nombre de chiffre après la virgule, cela permet donc de préciser le nombre

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    balance: number;

@OneToMany(() => Operation, (operation) => operation.user)
operations: Operation[]
}
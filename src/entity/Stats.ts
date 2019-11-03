import { IsNotEmpty, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Length(4, 100)
    public name: string;
}

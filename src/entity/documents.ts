import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Documents {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({default: ""})
    public filename: string;

    @Column({default: ""})
    public author: string;

    @Column({default: ""})
    @CreateDateColumn()
    public createdAt: string;

    @Column({default: ""})
    public hash: string;

    @Column({default: 0})
    public size: number;
}

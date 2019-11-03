import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Documents } from "./documents";

@Entity()
export class Favorites {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({default: ""})
    @CreateDateColumn()
    public createdAt: string;

    @JoinColumn()
    @ManyToOne(() => User)
    public user: User | number;

    @JoinColumn()
    @ManyToOne(() => Documents)
    public document: Documents | number;

}

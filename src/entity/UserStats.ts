import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Stats } from "./Stats";
import { User } from "./User";

@Entity()
export class UserStats {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => User)
    @JoinColumn()
    public user: User | number;

    @ManyToOne((type) => Stats)
    @JoinColumn()
    public stat: Stats | number;

    @Column({default: 0})
    public xp: number;
}

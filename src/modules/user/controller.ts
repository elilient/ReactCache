import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Stats } from "../../entity/Stats";
import { User } from "../../entity/User";
import { UserStats } from "../../entity/UserStats";

class UserController {

    public static listAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "role"],
        });

        res.send(users);
    }

    public static getOneById = async (req: Request, res: Response) => {
        const id: number = req.params.id;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "username", "role"],
            });
            res.send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    }

    public static newUser = async (req: Request, res: Response) => {
        const {username, password, role} = req.body;

        const user = new User();
        user.username = username;
        user.password = password;
        user.role = role;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        user.hashPassword();

        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }

        const statsRepo = getRepository(Stats);
        const statsList = [];
        const stats = await statsRepo.find({
            select: ["id"],
        });

        for (const stat of stats) {

            const singleStat = new UserStats();
            singleStat.stat = stat.id;
            singleStat.user = user.id;
            singleStat.xp = 0;

            statsList.push(singleStat);
        }

        const userStatsRepo = getRepository(UserStats);

        try {
            await userStatsRepo.save(statsList);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }

        res.status(201).send("User created");
    }

}

export default UserController;

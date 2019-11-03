import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Stats } from "../../entity/Stats";

class AdminController {
    public static createNewStat = async (req: Request, res: Response) => {
        const { title } = req.body;

        if (!title) {
            res.status(409).send("Add a title");
            return;
        }

        const statRepository = getRepository(Stats);
        const newStat = new Stats();
        newStat.name = title;

        try {
            await statRepository.save(newStat);
        } catch (e) {
            res.status(409).send("stat with that title already exsists");
            return;
        }

        res.status(201).send("Stat created");

    }
}

export default AdminController;

import { Request, Response } from "express";
import * as faker from "faker";
import { createQueryBuilder, getRepository } from "typeorm";
import { Documents } from "../../entity/documents";
import { Favorites } from "../../entity/favorites";

class DocumentsController {

    public listAll = async (req: Request, res: Response) => {
        const documentsRepository = getRepository(Documents);
        const {perPage} = req.query;
        const {page} = req.query;

        const documents = await documentsRepository.find(
            {
                order: {
                    id: "ASC",
                },
                skip: (page - 1) * perPage,
                take: perPage,
            },
        );

        res.send(documents);
    }

    public populate = async (req: Request, res: Response) => {
        const documentsRepository = getRepository(Documents);
        const documents: Documents[] = [];
        for (let i = 0; i < 5; i++) {
            const document = new Documents();

            document.filename = faker.system.fileName();
            document.author = faker.name.findName();
            document.hash = faker.random.uuid();
            document.size = faker.random.number({min: 1000, max: 10000000});

            documents.push(document);
        }

        const documentsSaved = await documentsRepository.save(documents);

        res.send(documentsSaved);
    }

    public favorite = async (req: Request, res: Response) => {
        const {documentID, userID} = req.body;

        if (!documentID || !userID) {
            res.send("forgot the IDs");

            return;
        }

        const favoritesRepository = getRepository(Favorites);
        const favorite = new Favorites();

        favorite.user = userID;
        favorite.document = documentID;

        const favoritesSaved = await favoritesRepository.save(favorite);

        res.send("Its done");
    }

    public listFavorites = async (req: Request, res: Response) => {
        const userID = req.params.id;
        const documentsRepository = getRepository(Documents);
        const favoritesRepository = getRepository(Favorites);

        const userFavorites = await favoritesRepository.find({ where: { user: userID}, relations: ["document"] });

        const items = userFavorites.map((favorite) => {
            return favorite.document;
        });

        setTimeout(() => {
            res.send(items);
        }, 2500);

    }

    public validateSomething = async (req: Request, res: Response) => {
        setTimeout(() => {
            res.send({
                valid: (Math.random() * 40) > 5,
            });
        }, Math.random() * (2000 - 15000) + 2000);
    }
}

export default DocumentsController;

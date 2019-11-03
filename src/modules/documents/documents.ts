import { Router } from "express";
import DocumentsController from "./controller";

const router = Router();
const documentsController = new DocumentsController();

router.get("/list", documentsController.listAll);
router.post("/favorite", documentsController.favorite);
router.get("/favorite/:id([0-9]+)", documentsController.listFavorites);
router.post("/fill", documentsController.populate);

export default router;

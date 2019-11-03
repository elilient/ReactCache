import { Router } from "express";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import AdminController from "./controller";

const router = Router();

router.post("/stat/new", [checkJwt, checkRole(["ADMIN"])], AdminController.createNewStat);

export default router;

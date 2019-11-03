import { Router } from "express";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import UserController from "./controller";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById,
);

router.post("/register", UserController.newUser);

export default router;

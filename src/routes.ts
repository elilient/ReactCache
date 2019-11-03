import { Router } from "express";
import admin from "./modules/admin/admin";
import auth from "./modules/auth/auth";
import documents from "./modules/documents/documents";
import user from "./modules/user/user";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/admin", admin);
routes.use("/documents", documents);

export default routes;

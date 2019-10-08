import { Router } from "express";
// import auth from "../middleware/auth";
import sidebarListController from "./../controller/sidebarList.controller";

const router = Router();

router.get("/", sidebarListController.getRoutes);

export default router;

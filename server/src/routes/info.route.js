import { Router } from "express";
import auth from "../middleware/auth";
import infoController from "./../controller/info.controller";

const router = Router();

router.get("/", infoController.getAllInfo);
router.post("/", auth, infoController.createInfo);
router.get("/:id", infoController.getInfoById);
router.patch("/:id", infoController.updateInfoById);
router.delete("/:id", infoController.deleteInfoById);

export default router;

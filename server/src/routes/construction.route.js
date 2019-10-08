import { Router } from "express";
import auth from "../middleware/auth";
import constructionController from "./../controller/construction.controller";

const router = Router();

router.get("/", constructionController.getAllConstruction);
router.post("/", auth, constructionController.createConstruction);
router.get("/:id", constructionController.getConstructionById);
router.patch("/:id", constructionController.updateConstructionById);
router.delete("/:id", constructionController.deleteConstructionById);

export default router;

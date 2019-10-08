import { Router } from "express";
import auth from "../middleware/auth";
import imageController from "./../controller/image.controller";

const router = Router();

// router.get("/", imageController.getAllImage);
router.post("/upload", auth, imageController.uploadImage);
router.get("/:id", imageController.getImageById);
// router.put("/update/:id", imageController.updateImageById);
// router.delete("/delete/:id", imageController.deleteImageById);

export default router;
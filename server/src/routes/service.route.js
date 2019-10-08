import { Router } from "express";
import auth from "../middleware/auth";
import serviceController from "./../controller/service.controller";

const router = Router();

router.get("/", serviceController.getAllService);
router.post("/", auth, serviceController.createService);
router.get("/:id", serviceController.getServiceById);
router.patch("/:id", serviceController.updateServiceById);
router.delete("/:id", serviceController.deleteServiceById);

export default router;

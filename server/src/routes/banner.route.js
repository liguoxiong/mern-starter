import { Router } from "express";
import auth from "../middleware/auth";
import bannerController from "./../controller/banner.controller";

const router = Router();

router.get("/", bannerController.getAllBanner);
router.post("/", auth, bannerController.createBanner);
router.get("/:id", bannerController.getBannerById);
router.patch("/:id", bannerController.updateBannerById);
router.delete("/:id", bannerController.deleteBannerById);

export default router;

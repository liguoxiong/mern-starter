import { Router } from "express";
// import auth from "../middleware/auth";
import mailController from "../controller/mail.controller";

const router = Router();

router.post("/", mailController.sendMail);

export default router;

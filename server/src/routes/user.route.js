import {Router} from 'express'
import auth from './../middleware/auth'
import userController from './../controller/user.controller'

const router = Router();
router.get("/current", auth, userController.getCurrentUser);
router.post("/register", userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/logout', userController.userLogout);
router.get('/', userController.getCurrentUserV2);


export default router
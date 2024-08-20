import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/users/signup").post(register);
router.route('/users/signin').post(login);

router.use(verifyJWT);

router.route('/users/signout').post(logout);

export default router;

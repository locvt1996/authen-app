import express from "express";

// controllers
import { login, loginFacebook, register, tryLogin } from "./authController";

// middlewares
import { getUserFromToken } from "../../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/login-facebook", loginFacebook);
authRouter.post("/register", register);
authRouter.post("/try-login", getUserFromToken, tryLogin);

export default authRouter;

import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", verifyToken, AuthController.Register);
router.post("/login", AuthController.Login);

export default router;

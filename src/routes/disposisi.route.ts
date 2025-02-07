import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { DisposisiController } from "../controllers/disposisi.controller";

const router = express.Router();

router.post("/", verifyToken, DisposisiController.CreateDisposisi);

export default router;

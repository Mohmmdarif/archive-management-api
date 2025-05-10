import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { ClassifierController } from "../controllers/classifier.controller";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";

const router = express.Router();

router.get("/", verifyToken, ClassifierController.GetClassifier);

export default router;

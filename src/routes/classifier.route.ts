import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { ClassifierController } from "../controllers/classifier.controller";

const router = express.Router();

router.get(
  "/",
  // verifyToken,
  ClassifierController.GetClassifier
);

export default router;

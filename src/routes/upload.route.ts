import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { UploadController } from "../controllers/upload.controller";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

router.post(
  "/single",
  verifyToken,
  upload.single("file"),
  UploadController.SingleUpload
);

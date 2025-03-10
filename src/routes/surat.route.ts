import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { SuratController } from "../controllers/surat.controller";
import uploadMiddleware from "../middlewares/upload.middleware";

const router = express.Router();

router.post(
  "/single",
  verifyToken,
  uploadMiddleware.single("file"),
  SuratController.SingleUpload
);

export default router;

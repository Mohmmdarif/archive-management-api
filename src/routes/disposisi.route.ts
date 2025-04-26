import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { DisposisiController } from "../controllers/disposisi.controller";

const router = express.Router();

router.post("/create", DisposisiController.CreateDisposisi);
router.get("/:id", DisposisiController.DisposisiById);
router.get("/surat/:idSuratMasuk", DisposisiController.DisposisiBySuratMasuk);

export default router;

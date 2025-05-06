import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { DisposisiController } from "../controllers/disposisi.controller";

const router = express.Router();

// status disposisi
router.get("/status", DisposisiController.DisposisiStatus);

router.get("/:id", DisposisiController.DisposisiById);
router.get("/surat/:idSuratMasuk", DisposisiController.DisposisiBySuratMasuk);
router.get(
  "/surat/penerima/:idUser",
  DisposisiController.DisposisiByUserPenerima
);

router.post("/create", DisposisiController.CreateDisposisi);

export default router;

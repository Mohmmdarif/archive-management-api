import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { DisposisiController } from "../controllers/disposisi.controller";

const router = express.Router();

// status disposisi
router.get("/status", verifyToken, DisposisiController.DisposisiStatus);

router.get("/:id", verifyToken, DisposisiController.DisposisiById);
router.get(
  "/surat/:idSuratMasuk",
  verifyToken,
  DisposisiController.DisposisiBySuratMasuk
);
router.get(
  "/surat/penerima/:idUser",
  verifyToken,
  DisposisiController.DisposisiByUserPenerima
);

router.post(
  "/create",
  verifyToken,
  rbacMiddleware([
    UserRole.KoordinatorTU,
    UserRole.Pimpinan,
    UserRole.ArsiparisSM,
    UserRole.UserGeneral,
  ]),
  DisposisiController.CreateDisposisi
);

export default router;

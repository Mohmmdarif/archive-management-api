import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { SuratController } from "../controllers/surat.controller";
import uploadMiddleware from "../middlewares/upload.middleware";

const router = express.Router();

router.get("/letters", SuratController.GetAllSurat);

router.get(
  "/letters/:id",
  // verifyToken,
  // rbacMiddleware([
  //   UserRole.KoordinatorTU,
  //   UserRole.ArsiparisSM,
  //   UserRole.ArsiparisSK,
  // ]),
  SuratController.GetSuratById
);

router.post(
  "/single",
  // verifyToken,
  uploadMiddleware.single,
  SuratController.SingleUpload
);

router.post("/save", SuratController.SaveConfirmedSurat);

router.put(
  "/:id",
  verifyToken,
  rbacMiddleware([
    UserRole.KoordinatorTU,
    UserRole.ArsiparisSM,
    UserRole.ArsiparisSK,
  ]),
  SuratController.UpdateSurat
);

router.delete(
  "/:id",
  verifyToken,
  rbacMiddleware([
    UserRole.KoordinatorTU,
    UserRole.ArsiparisSM,
    UserRole.ArsiparisSK,
  ]),
  SuratController.DeleteSurat
);
export default router;

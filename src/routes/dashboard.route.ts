import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { DashboardController } from "../controllers/dashboard.controller";

const router = express.Router();

router.get(
  "/suratmasuk/count",
  verifyToken,
  DashboardController.GetSuratMasukCount
);

router.get(
  "/suratkeluar/count",
  verifyToken,
  DashboardController.GetSuratKeluarCount
);

router.get(
  "/suratdisposisi/count/:id",
  verifyToken,
  rbacMiddleware([
    UserRole.KoordinatorTU,
    UserRole.Pimpinan,
    UserRole.ArsiparisSM,
    UserRole.UserGeneral,
  ]),
  DashboardController.GetDisposisiCount
);

router.get("/surat/today", verifyToken, DashboardController.GetSuratToday);

export default router;

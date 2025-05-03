import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { DashboardController } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/suratmasuk/count", DashboardController.GetSuratMasukCount);

router.get("/suratkeluar/count", DashboardController.GetSuratKeluarCount);

router.get("/suratdisposisi/count", DashboardController.GetDisposisiCount);

router.get("/surat/today", DashboardController.GetSuratToday);

export default router;

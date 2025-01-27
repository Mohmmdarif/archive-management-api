import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { CriteriaController } from "../controllers/criteria.controller";

const router = express.Router();

router.get("/", verifyToken, CriteriaController.GetCriteria);
router.post(
  "/create",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  CriteriaController.CreateCriteria
);
router.put(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  CriteriaController.UpdateCriteria
);
router.delete(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  CriteriaController.DeleteCriteria
);

export default router;

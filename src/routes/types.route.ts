import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { TypesController } from "../controllers/types.controller";

const router = express.Router();

router.get("/", verifyToken, TypesController.GetTypes);
router.post(
  "/create",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  TypesController.CreateTypes
);
router.put(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  TypesController.UpdateTypes
);
router.delete(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  TypesController.DeleteTypes
);

export default router;

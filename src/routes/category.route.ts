import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { CategoryController } from "../controllers/category.controller";

const router = express.Router();

router.get("/", verifyToken, CategoryController.GetCategories);
router.post(
  "/create",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  CategoryController.CreateCategory
);
router.put(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  CategoryController.UpdateCategory
);
router.delete(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  CategoryController.DeleteCategory
);

export default router;

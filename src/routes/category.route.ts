import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { CategoryController } from "../controllers/category.controller";

const router = express.Router();

router.get("/", CategoryController.GetCategories);
router.post(
  "/create",

  // rbacMiddleware([UserRole.KoordinatorTU]),
  CategoryController.CreateCategory
);
router.put(
  "/:id",

  // rbacMiddleware([UserRole.KoordinatorTU]),
  CategoryController.UpdateCategory
);
router.delete(
  "/:id",

  // rbacMiddleware([UserRole.KoordinatorTU]),
  CategoryController.DeleteCategory
);

export default router;

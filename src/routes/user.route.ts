import express from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";

const router = express.Router();

router.get("/", verifyToken, UserController.GetUsers);
router.get("/me", verifyToken, UserController.Me);
router.put(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  UserController.UpdateProfile
);
router.delete(
  "/:id",
  verifyToken,
  rbacMiddleware([UserRole.KoordinatorTU]),
  UserController.DeleteUser
);

export default router;

import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { IRequestWithUser } from "../middlewares/auth.middleware";
import { CustomError } from "../utils/customError";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";

export const UserController = {
  GetUsers: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const users = await UserService.GetUsers();

      res.status(200).json({
        success: true,
        message: "Success get all users",
        data: users,
      });
    } catch (error) {
      _next(error);
    }
  },

  Me: async (req: IRequestWithUser, res: Response, _next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new CustomError(403, "User not found!");
      }

      const user = await UserService.Me(userId);

      res.status(200).json({
        success: true,
        message: "Success get user data",
        data: user,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },

  UpdateProfile: async (
    req: IRequestWithUser,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const userId = req.params.id;

      const updatedUser = await UserService.UpdateProfile(
        parseInt(userId),
        req.body as IUser
      );

      res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },

  DeleteUser: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const userId = req.params.id;

      const deletedUser = await UserService.DeleteUser(parseInt(userId));

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },
};

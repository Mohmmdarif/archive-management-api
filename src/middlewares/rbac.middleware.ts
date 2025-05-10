import { NextFunction, Response } from "express";
import { IRequestWithUser } from "./auth.middleware";
import { CustomError } from "../utils/customError";

export enum UserRole {
  KoordinatorTU = 1,
  Pimpinan = 2,
  ArsiparisSM = 3,
  ArsiparisSK = 4,
  UserGeneral = 5,
}

export default (allowedRoles: UserRole[]) => {
  return (req: IRequestWithUser, res: Response, _next: NextFunction) => {
    if (!req.user || !req.user?.role_id) {
      _next(new CustomError(403, "Unauthorized: No user data found"));
    }

    const userRoles = req.user?.role_id;
    console.log(userRoles, "userRoles");

    const hasAccess = allowedRoles.includes(userRoles as UserRole);

    if (!hasAccess) {
      _next(
        new CustomError(
          403,
          "Unauthorized: You don't have permission to access this resource"
        )
      );
    }

    _next();
  };
};

import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import {
  loginSchema,
  registerSchema,
} from "../utils/validations/auth.validation";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../utils/customError";
import { IUser } from "../interfaces/user.interface";

type TRegisterBody = Yup.InferType<typeof registerSchema>;
type TLoginBody = Yup.InferType<typeof loginSchema>;

interface IRequestRegister extends Request {
  body: TRegisterBody;
}
interface IRequestLogin extends Request {
  body: TLoginBody;
}

export const AuthController = {
  Register: async (
    req: IRequestRegister,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      await registerSchema.validate(req.body as unknown as IUser, {
        abortEarly: false,
      });

      const user = await AuthService.CreateUser(req.body);

      res.status(201).json({
        success: true,
        message: "User successfully registered",
        data: user,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },

  Login: async (req: IRequestLogin, res: Response, _next: NextFunction) => {
    try {
      await loginSchema.validate(req.body, {
        abortEarly: false,
      });

      const user = await AuthService.Login(req.body);

      res.status(200).json({
        success: true,
        message: "User successfully logged in",
        data: user,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },
};

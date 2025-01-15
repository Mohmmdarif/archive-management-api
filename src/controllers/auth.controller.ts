import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as Yup from "yup";
import {
  loginSchema,
  registerSchema,
} from "../utils/validations/auth.validation";
import { AuthRepository } from "../repositories/auth.repository";

type TRegisterBody = Yup.InferType<typeof registerSchema>;
type TLoginBody = Yup.InferType<typeof loginSchema>;

interface IRequestRegister extends Request {
  body: TRegisterBody;
}
interface IRequestLogin extends Request {
  body: TLoginBody;
}

export const AuthController = {
  Register: async (req: IRequestRegister, res: Response) => {
    try {
      const { nama_lengkap, email, nip, password, id_jenis_kelamin, role_id } =
        req.body;

      const isValidate = await registerSchema.validate({
        nama_lengkap,
        email,
        nip,
        password,
        id_jenis_kelamin,
        role_id,
      });

      if (!isValidate) {
        throw new Error("Invalid input data");
      }

      const existingUser = await AuthRepository.FindByEmail(email);

      if (existingUser) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await AuthRepository.Create({
        nama_lengkap,
        email,
        nip,
        password: hashedPassword,
        id_jenis_kelamin,
        role_id,
      });

      res.status(201).json({
        message: "User successfully registered",
        data: user,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        data: err.message,
        message: "Failed to register user",
      });
    }
  },
  Login: async (req: IRequestLogin, res: Response) => {
    try {
      const { email, password } = req.body;

      const isValidate = await loginSchema.validate({
        email,
        password,
      });

      if (!isValidate) {
        throw new Error("Invalid input data");
      }
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        data: err.message,
        message: "Failed to login",
      });
    }
  },
  Me: async (req: Request, res: Response) => {
    res.send("Me");
  },
};

import { ILoginPayload, IRegisterPayload } from "../interfaces/auth.interface";
import { AuthRepository } from "../repositories/auth.repository";
import { CustomError } from "../utils/customError";
import { comparePassword, encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";

export const AuthService = {
  CreateUser: async (payload: IRegisterPayload) => {
    const { nama_lengkap, email, nip, password, id_jenis_kelamin, role_id } =
      payload;

    const existingUser = await AuthRepository.FindByEmail(email);

    if (existingUser) {
      throw new CustomError(400, "Email already registered");
    }

    const hashedPassword = await encrypt(password);

    const user = await AuthRepository.Create({
      nama_lengkap,
      email,
      nip,
      password: hashedPassword,
      id_jenis_kelamin,
      role_id,
    });

    return user;
  },

  Login: async (payload: ILoginPayload) => {
    const { email, password } = payload;

    const user = await AuthRepository.FindByEmail(email);

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const isPasswordMatch: boolean = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new CustomError(400, "Password is incorrect");
    }

    const data = {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
    };

    const token = generateToken(data);

    return token;
  },
};

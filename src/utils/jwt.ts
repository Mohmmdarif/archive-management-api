import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";

export interface IUserToken
  extends Omit<
    User,
    | "nama_lengkap"
    | "gambar_profil"
    | "nip"
    | "email"
    | "password"
    | "id_jenis_kelamin"
    | "jabatan"
    | "no_telp"
    | "status_aktif"
    | "created_at"
    | "updated_at"
  > {
  id: User["id"];
}

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, JWT_SECRET) as IUserToken;

  return user;
};

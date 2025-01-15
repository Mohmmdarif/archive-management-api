import { PrismaClient } from "@prisma/client";
import { IRegisterPayload } from "../interfaces/auth.interface";

const prisma = new PrismaClient();

export const AuthRepository = {
  Create: async (payload: IRegisterPayload) => {
    const { nama_lengkap, email, nip, password, id_jenis_kelamin, role_id } =
      payload;

    const user = await prisma.user.create({
      data: {
        nama_lengkap,
        email,
        nip,
        password,
        id_jenis_kelamin,
        role_id,
      },
    });

    return user;
  },
  FindByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  },
};

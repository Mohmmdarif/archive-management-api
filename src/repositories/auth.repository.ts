import prisma from "../db";
import { IRegisterPayload } from "../interfaces/auth.interface";

export const AuthRepository = {
  Create: async (payload: IRegisterPayload) => {
    const user = await prisma.user.create({
      data: payload,
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

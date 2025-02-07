import prisma from "../db";
import { IUser } from "../interfaces/user.interface";

export const UserRepository = {
  FindAll: async () => {
    const users = await prisma.user.findMany();

    return users;
  },

  FindById: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  },

  Update: async (userId: string, payload: IUser) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });

    return updatedUser;
  },

  Delete: async (userId: string) => {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return;
  },
};

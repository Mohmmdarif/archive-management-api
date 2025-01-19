import prisma from "../db";
import { IUser } from "../interfaces/user.interface";

export const UserRepository = {
  FindAll: async () => {
    const users = await prisma.user.findMany();

    return users;
  },

  FindById: async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  },

  Update: async (userId: number, payload: IUser) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });

    return updatedUser;
  },

  Delete: async (userId: number) => {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return;
  },
};

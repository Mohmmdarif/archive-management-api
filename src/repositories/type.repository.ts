import prisma from "../db";
import { ITypePayload } from "../interfaces/detail.interface";

export const TypesRepository = {
  FindAll: async () => {
    const types = await prisma.jenis_Surat.findMany();

    return types;
  },

  FindById: async (typeId: number) => {
    const type = await prisma.jenis_Surat.findUnique({
      where: {
        id: typeId,
      },
    });

    return type;
  },

  Create: async (payload: ITypePayload) => {
    const type = await prisma.jenis_Surat.create({
      data: payload,
    });

    return type;
  },

  Update: async (typeId: number, payload: ITypePayload) => {
    const updatedType = await prisma.jenis_Surat.update({
      where: {
        id: typeId,
      },
      data: payload,
    });

    return updatedType;
  },

  Delete: async (typeId: number) => {
    await prisma.jenis_Surat.delete({
      where: {
        id: typeId,
      },
    });

    return;
  },
};

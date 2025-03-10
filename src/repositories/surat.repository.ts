import { Prisma } from "@prisma/client";
import prisma from "../db";
import { ISurat } from "../interfaces/surat.interface";

export const SuratRepository = {
  Create: async (payload: ISurat) => {
    const surat = await prisma.surat.create({
      data: payload,
    });
    return surat;
  },

  FindById: async (id: string) => {
    const surat = await prisma.surat.findUnique({
      where: { id },
    });

    return surat;
  },

  FindAll: async () => {
    const surat = await prisma.surat.findMany();
    return surat;
  },

  Update: async (id: string, payload: any) => {
    const surat = await prisma.surat.update({
      where: { id },
      data: payload,
    });

    return surat;
  },

  Delete: async (id: string) => {
    const surat = await prisma.surat.delete({
      where: { id },
    });

    return surat;
  },
};

import prisma from "../db";
import { ICriteriaPayload } from "../interfaces/detail.interface";

export const CriteriaRepository = {
  FindAll: async () => {
    const criterias = await prisma.kriteria_Surat.findMany();

    return criterias;
  },

  FindById: async (criteriaId: number) => {
    const criteria = await prisma.kriteria_Surat.findUnique({
      where: {
        id: criteriaId,
      },
    });

    return criteria;
  },

  Create: async (payload: ICriteriaPayload) => {
    const criteria = await prisma.kriteria_Surat.create({
      data: payload,
    });

    return criteria;
  },

  Update: async (criteriaId: number, payload: ICriteriaPayload) => {
    const updatedType = await prisma.kriteria_Surat.update({
      where: {
        id: criteriaId,
      },
      data: payload,
    });

    return updatedType;
  },

  Delete: async (criteriaId: number) => {
    await prisma.kriteria_Surat.delete({
      where: {
        id: criteriaId,
      },
    });

    return;
  },
};

import prisma from "../db";

export const ClassifierRepository = {
  FindAll: async () => {
    const classifier = await prisma.type_Surat.findMany();

    return classifier;
  },
};

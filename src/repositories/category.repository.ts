import prisma from "../db";
import { ICategoryPayload } from "../interfaces/detail.interface";

export const CategoryRepository = {
  FindAll: async () => {
    const categories = await prisma.kategori_Surat.findMany();

    return categories;
  },

  FindById: async (categoryId: number) => {
    const category = await prisma.kategori_Surat.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category;
  },

  Create: async (payload: ICategoryPayload) => {
    const category = await prisma.kategori_Surat.create({
      data: payload,
    });

    return category;
  },

  Update: async (categoryId: number, payload: ICategoryPayload) => {
    const updatedCategory = await prisma.kategori_Surat.update({
      where: {
        id: categoryId,
      },
      data: payload,
    });

    return updatedCategory;
  },

  Delete: async (categoryId: number) => {
    await prisma.kategori_Surat.delete({
      where: {
        id: categoryId,
      },
    });

    return;
  },
};

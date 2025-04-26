import prisma from "../db";
import { Disposisi, Prisma } from "@prisma/client";

export const DisposisiRepository = {
  Create: async (payload: Prisma.DisposisiCreateInput) => {
    const disposisi = await prisma.disposisi.create({
      data: payload,
    });

    return disposisi;
  },

  FindById: async (id: string) => {
    return await prisma.disposisi.findUnique({
      where: { id },
      include: {
        pengaju: true,
        penerima: true,
        surat_masuk: true,
        parent_disposisi: true,
      },
    });
  },

  FindBySuratMasuk: async (idSuratMasuk: string) => {
    return await prisma.disposisi.findMany({
      where: { id_surat_masuk: idSuratMasuk },
      orderBy: { tanggal_disposisi: "asc" },
      include: {
        pengaju: true,
        penerima: true,
        status_disposisi: true,
      },
    });
  },
};

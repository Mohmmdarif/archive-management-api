import prisma from "../db";

export const DashboardRepository = {
  GetSuratMasukCount: async () => {
    const suratMasukCount = await prisma.surat_Masuk.count();
    return suratMasukCount;
  },

  GetSuratKeluarCount: async () => {
    const suratKeluarCount = await prisma.surat_Keluar.count();
    return suratKeluarCount;
  },

  GetDisposisiCount: async () => {
    const disposisiCount = await prisma.surat.count({
      where: {
        Surat_Masuk: {
          some: {
            status_disposisi: {
              id: 6,
            },
          },
        },
      },
    });
    return disposisiCount;
  },

  GetSuratToday: async () => {
    const suratToday = await prisma.surat.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });
    return suratToday;
  },
};

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

  GetDisposisiCount: async (idUser: string) => {
    const allSurat = await prisma.surat_Masuk.findMany({
      include: {
        disposisi: {
          orderBy: { tanggal_disposisi: "desc" }, // urutkan disposisi dari yang terbaru
          include: {
            pengaju: {
              select: {
                id: true,
                nama_lengkap: true,
                role_id: true,
                jabatan: true,
                created_at: true,
              },
            },
            penerima: {
              select: {
                id: true,
                nama_lengkap: true,
                role_id: true,
                jabatan: true,
                created_at: true,
              },
            },
            status_disposisi: true,
          },
        },
      },
      orderBy: { tanggal_ajuan_disposisi: "desc" },
    });

    const filteredSurat = allSurat.filter((surat) => {
      const lastDisposisi = surat.disposisi[0];
      return lastDisposisi?.penerima?.id === idUser;
    });

    return filteredSurat.length;
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

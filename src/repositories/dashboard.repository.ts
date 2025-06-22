import prisma from "../db";

export const DashboardRepository = {
  GetSuratMasukCount: async () => {
    const suratMasukCount = await prisma.surat_Masuk.count({
      where: {
        surat: {
          is_deleted: false,
        },
      },
    });
    return suratMasukCount;
  },

  GetSuratKeluarCount: async () => {
    const suratKeluarCount = await prisma.surat_Keluar.count({
      where: {
        surat: {
          is_deleted: false,
        },
      },
    });
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

  GetAjuanPenghapusanCount: async () => {
    const ajuanPenghapusanCount = await prisma.surat.findMany({
      where: {
        is_deleted: false,
        status_penghapusan_surat: "REQUESTED",
      },
    });
    return ajuanPenghapusanCount.length;
  },

  GetSuratToday: async () => {
    const suratToday = await prisma.surat.findMany({
      where: {
        is_deleted: false,
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });
    return suratToday;
  },
};

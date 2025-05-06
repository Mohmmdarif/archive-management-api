import prisma from "../db";
import { Disposisi, Prisma } from "@prisma/client";

export const DisposisiRepository = {
  Create: async (payload: Prisma.DisposisiCreateInput) => {
    const [disposisi] = await prisma.$transaction([
      prisma.disposisi.create({
        data: payload,
      }),
      prisma.surat_Masuk.update({
        where: { id: payload.surat_masuk.connect?.id },
        data: {
          id_status_disposisi: payload.status_disposisi.connect?.id,
          tanggal_ajuan_disposisi: new Date(),
        },
      }),
    ]);

    return disposisi;
  },

  FindById: async (id: string) => {
    return await prisma.disposisi.findUnique({
      where: { id },
      include: {
        pengaju: {
          select: {
            id: true,
            nip: true,
            nama_lengkap: true,
            email: true,
            role_id: true,
            jabatan: true,
            status_aktif: true,
            created_at: true,
            updated_at: true,
          },
        },
        penerima: {
          select: {
            id: true,
            nip: true,
            nama_lengkap: true,
            email: true,
            role_id: true,
            jabatan: true,
            status_aktif: true,
            created_at: true,
            updated_at: true,
          },
        },
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
        pengaju: {
          select: {
            id: true,
            nip: true,
            nama_lengkap: true,
            email: true,
            role_id: true,
            jabatan: true,
            status_aktif: true,
            created_at: true,
            updated_at: true,
          },
        },
        penerima: {
          select: {
            id: true,
            nip: true,
            nama_lengkap: true,
            email: true,
            role_id: true,
            jabatan: true,
            status_aktif: true,
            created_at: true,
            updated_at: true,
          },
        },
        status_disposisi: true,
      },
    });
  },

  // FindByUserPenerima: async (idUser: string) => {
  //   return await prisma.surat_Masuk.findMany({
  //     orderBy: { tanggal_ajuan_disposisi: "desc" },
  //     where: {
  //       disposisi: {
  //         some: {
  //           penerima: {
  //             id: idUser,
  //           },
  //         },
  //       },
  //     },
  //     include: {
  //       disposisi: {
  //         include: {
  //           pengaju: {
  //             select: {
  //               id: true,
  //               nip: true,
  //               nama_lengkap: true,
  //               email: true,
  //               role_id: true,
  //               jabatan: true,
  //               status_aktif: true,
  //               created_at: true,
  //               updated_at: true,
  //             },
  //           },
  //           penerima: {
  //             select: {
  //               id: true,
  //               nip: true,
  //               nama_lengkap: true,
  //               email: true,
  //               role_id: true,
  //               jabatan: true,
  //               status_aktif: true,
  //               created_at: true,
  //               updated_at: true,
  //             },
  //           },
  //           status_disposisi: true,
  //         },
  //       },
  //     },
  //   });
  // },

  FindByUserPenerima: async (idUser: string) => {
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

    return filteredSurat;
  },

  FindAllStatusDisposisi: async () => {
    return await prisma.status_Disposisi.findMany();
  },
};

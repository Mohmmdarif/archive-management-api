import prisma from "../db";
import { ISurat } from "../interfaces/surat.interface";

export const SuratRepository = {
  Create: async (payload: ISurat) => {
    const transaction = await prisma.$transaction(async (prisma) => {
      const dataSurat = {
        created_at: payload.created_at,
        pengarsip: payload.pengarsip,
        no_surat: payload.no_surat,
        tanggal_surat: payload.tanggal_surat,
        id_type_surat: payload.id_type_surat,
        perihal_surat: payload.perihal_surat,
        id_jenis_surat: payload.id_jenis_surat,
        id_kriteria_surat: payload.id_kriteria_surat,
        pengirim_surat: payload.pengirim_surat,
        penerima_surat: payload.penerima_surat,
        path_file: payload.path_file,
        filename: payload.filename,
      };

      const surat = await prisma.surat.create({
        data: dataSurat,
      });

      if (payload.id_type_surat === 1) {
        await prisma.surat_Masuk.create({
          data: {
            id_surat: surat.id,
            no_agenda: parseInt(String(payload.no_agenda ?? "0")),
            id_kategori_surat: payload.id_kategori_surat ?? 0,
            jumlah_lampiran: parseInt(String(payload.jumlah_lampiran ?? "0")),
            id_user_disposisi: payload.id_user_disposisi ?? null,
            tanggal_terima: payload.tanggal_terima ?? new Date(),
            id_status_disposisi: payload.id_status_disposisi ?? 1,
            tanggal_ajuan_disposisi: payload.tanggal_ajuan_disposisi,
            keterangan: payload.keterangan ?? "",
          },
        });
      } else if (payload.id_type_surat === 2) {
        await prisma.surat_Keluar.create({
          data: {
            id_surat: surat.id,
            tanggal_kirim: payload.tanggal_kirim ?? new Date(),
          },
        });
      }
      return surat;
    });
    return transaction;
  },

  FindById: async (id: string) => {
    const surat = await prisma.surat.findUnique({
      where: { id },
      include: {
        Surat_Masuk: {
          select: {
            id: true,
            no_agenda: true,
            id_kategori_surat: true,
            jumlah_lampiran: true,
            id_user_disposisi: true,
            tanggal_terima: true,
            id_status_disposisi: true,
            tanggal_ajuan_disposisi: true,
            keterangan: true,
          },
        },
        surat_keluar: {
          select: {
            id: true,
            tanggal_kirim: true,
          },
        },
      },
    });

    return surat;
  },

  FindAll: async () => {
    const surat = await prisma.surat.findMany({
      include: {
        Surat_Masuk: {
          select: {
            id: true,
            no_agenda: true,
            id_kategori_surat: true,
            jumlah_lampiran: true,
            id_user_disposisi: true,
            tanggal_terima: true,
            id_status_disposisi: true,
            tanggal_ajuan_disposisi: true,
            keterangan: true,
          },
        },
        surat_keluar: {
          select: {
            id: true,
            tanggal_kirim: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return surat;
  },

  Update: async (id: string, payload: ISurat) => {
    const transaction = await prisma.$transaction(async (prisma) => {
      const surat = await prisma.surat.update({
        where: { id },
        data: {
          no_surat: payload.no_surat,
          id_type_surat: payload.id_type_surat,
          perihal_surat: payload.perihal_surat,
          tanggal_surat: payload.tanggal_surat,
          id_jenis_surat: payload.id_jenis_surat,
          id_kriteria_surat: payload.id_kriteria_surat,
          pengirim_surat: payload.pengirim_surat,
          penerima_surat: payload.penerima_surat,
          status_surat: payload.status_surat,
          filename: payload.filename,
          path_file: payload.path_file,
        },
      });

      if (payload.id_type_surat === 1) {
        await prisma.surat_Masuk.update({
          where: { id_surat: id },
          data: {
            no_agenda: parseInt(String(payload.no_agenda ?? "0")),
            id_kategori_surat: payload.id_kategori_surat ?? 0,
            jumlah_lampiran: parseInt(String(payload.jumlah_lampiran ?? "0")),
            id_user_disposisi: payload.id_user_disposisi ?? null,
            tanggal_terima: payload.tanggal_terima ?? new Date(),
            id_status_disposisi: payload.id_status_disposisi ?? 1,
            tanggal_ajuan_disposisi: payload.tanggal_ajuan_disposisi,
            keterangan: payload.keterangan ?? "",
          },
        });
      } else if (payload.id_type_surat === 2) {
        await prisma.surat_Keluar.update({
          where: { id_surat: id },
          data: {
            tanggal_kirim: payload.tanggal_kirim ?? new Date(),
          },
        });
      }

      return surat;
    });
    return transaction;
  },

  Delete: async (id: string) => {
    const transaction = await prisma.$transaction(async (prisma) => {
      // Cek apakah ada Surat_Masuk yang terkait dengan Surat ID
      const suratMasuk = await prisma.surat_Masuk.findFirst({
        where: { id_surat: id },
      });

      // Jika ada, hapus semua disposisi terkait surat masuk
      if (suratMasuk) {
        await prisma.disposisi.deleteMany({
          where: { id_surat_masuk: suratMasuk.id },
        });

        // Hapus Surat_Masuk yang terkait
        await prisma.surat_Masuk.delete({
          where: { id: suratMasuk.id },
        });
      }

      // Cek apakah ada Surat_Keluar yang terkait dengan Surat ID
      const suratKeluar = await prisma.surat_Keluar.findFirst({
        where: { id_surat: id },
      });

      // Jika ada, hapus Surat_Keluar yang terkait
      if (suratKeluar) {
        await prisma.surat_Keluar.delete({
          where: { id: suratKeluar.id },
        });
      }

      // Terakhir, hapus Surat utama
      const deletedSurat = await prisma.surat.delete({
        where: { id },
      });

      return deletedSurat;
    });
    return transaction;
  },
};

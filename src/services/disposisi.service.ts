import { Disposisi, Prisma } from "@prisma/client";
import { DisposisiRepository } from "../repositories/disposisi.repository";
import { IDisposisiPayload } from "../interfaces/disposisi.interface";
import { CustomError } from "../utils/customError";

export const DisposisiService = {
  CreateDisposisi: async (payload: IDisposisiPayload) => {
    const data: Prisma.DisposisiCreateInput = {
      surat_masuk: {
        connect: { id: payload.id_surat_masuk },
      },
      pengaju: {
        connect: { id: payload.id_pengaju },
      },
      penerima: {
        connect: { id: payload.id_penerima },
      },
      status_disposisi: {
        connect: { id: payload.id_status_disposisi },
      },
      pesan_disposisi: payload.pesan_disposisi,
      parent_disposisi: payload.parent_disposisi_id
        ? {
            connect: { id: payload.parent_disposisi_id },
          }
        : undefined,
      created_at: payload.created_at || new Date(),
      updated_at: payload.updated_at || new Date(),
    };

    const disposisi = await DisposisiRepository.Create(data);

    return disposisi;
  },

  DisposisiById: async (id: string) => {
    const disposisi = await DisposisiRepository.FindById(id);

    if (!disposisi) {
      throw new CustomError(404, "Disposisi not found");
    }

    return disposisi;
  },

  DisposisiBySuratMasuk: async (idSuratMasuk: string) => {
    const disposisi = await DisposisiRepository.FindBySuratMasuk(idSuratMasuk);

    return disposisi;
  },
};

import { IDisposisiPayload } from "../interfaces/disposisi.interface";
import { DisposisiRepository } from "../repositories/disposisi.repository";

export const DisposisiService = {
  CreateDisposisi: async (payload: IDisposisiPayload) => {
    const disposisi = await DisposisiRepository.Create(payload);

    return disposisi;
  },
};

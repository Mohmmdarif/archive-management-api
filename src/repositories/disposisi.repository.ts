import prisma from "../db";
import { IDisposisiPayload } from "../interfaces/disposisi.interface";

export const DisposisiRepository = {
  Create: async (payload: IDisposisiPayload) => {
    const disposisi = await prisma.disposisi.create({
      data: payload,
    });

    return disposisi;
  },
};

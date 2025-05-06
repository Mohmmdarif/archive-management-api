import { DashboardRepository } from "../repositories/dashboard.repository";
import { CustomError } from "../utils/customError";

export const DashboardService = {
  GetSuratMasukCount: async () => {
    try {
      const suratMasukCount = await DashboardRepository.GetSuratMasukCount();
      return suratMasukCount;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  GetSuratKeluarCount: async () => {
    try {
      const suratKeluarCount = await DashboardRepository.GetSuratKeluarCount();
      return suratKeluarCount;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  GetDisposisiCount: async (idUser: string) => {
    try {
      const disposisiCount = await DashboardRepository.GetDisposisiCount(
        idUser
      );
      return disposisiCount;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  GetSuratToday: async () => {
    try {
      const suratToday = await DashboardRepository.GetSuratToday();
      return suratToday;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },
};

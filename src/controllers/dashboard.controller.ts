import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { DashboardService } from "../services/dashboard.service";

export const DashboardController = {
  GetSuratMasukCount: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const suratMasukCount = await DashboardService.GetSuratMasukCount();

      res.status(200).json({
        success: true,
        message: "Get surat masuk count successfully",
        data: suratMasukCount,
      });
    } catch (error) {
      _next(error);
    }
  },

  GetSuratKeluarCount: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const suratKeluarCount = await DashboardService.GetSuratKeluarCount();

      res.status(200).json({
        success: true,
        message: "Get surat keluar count successfully",
        data: suratKeluarCount,
      });
    } catch (error) {
      _next(error);
    }
  },

  GetDisposisiCount: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const idUser = req.params.id;
      const disposisiCount = await DashboardService.GetDisposisiCount(idUser);

      res.status(200).json({
        success: true,
        message: "Get disposisi count successfully",
        data: disposisiCount,
      });
    } catch (error) {
      _next(error);
    }
  },

  GetSuratToday: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const suratToday = await DashboardService.GetSuratToday();

      res.status(200).json({
        success: true,
        message: "Get surat today successfully",
        data: suratToday,
      });
    } catch (error) {
      _next(error);
    }
  },
};

import { NextFunction, Request, Response } from "express";
import { SuratService } from "../services/surat.service";
import { CustomError } from "../utils/customError";
import { createSuratSchema } from "../utils/validations/surat.validation";
import { ISurat } from "../interfaces/surat.interface";
import { IRequestWithUser } from "../middlewares/auth.middleware";
import * as yup from "yup";
import { deleteFile } from "../utils/fileHelp";
import { UserRole } from "../middlewares/rbac.middleware";

export const SuratController = {
  GetAllSurat: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const surat = await SuratService.FindAll();
      res.status(200).json({
        success: true,
        message: "Get all surat successfully",
        data: surat,
      });
    } catch (error) {
      _next(error);
    }
  },

  GetSuratById: async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
      const surat = await SuratService.FindById(id);

      res.status(200).json({
        success: true,
        message: "Get surat by ID successfully",
        data: surat,
      });
    } catch (error) {
      _next(error);
    }
  },

  SingleUpload: async (req: Request, res: Response, _next: NextFunction) => {
    let filePath: string | null = null;
    try {
      if (!req.file) {
        throw new CustomError(400, "No File Uploaded!");
      }

      filePath = req.file.path;

      const surat = await SuratService.SingleUpload(filePath);

      const publicFilePath = `${req.protocol}://${req.get(
        "host"
      )}/${filePath.replace(/\\/g, "/")}`;

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: {
          ...surat,
          filePath: publicFilePath,
        },
      });
    } catch (error) {
      // Hapus file jika gagal
      if (filePath) {
        await deleteFile(filePath);
      }

      if (error instanceof yup.ValidationError) {
        const errors = error.errors.join(", ");
        return _next(new CustomError(400, errors));
      }
      _next(error);
    }
  },

  SaveConfirmedSurat: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const surat: ISurat = req.body.data;

      // Validate surat data
      await createSuratSchema.validate(surat, { abortEarly: false });

      // Save surat to the database
      const savedSurat = await SuratService.SaveConfirmedSurat(surat);

      res.status(200).json({
        success: true,
        message: "Surat saved successfully",
        data: savedSurat,
      });
    } catch (error) {
      // Hapus file jika gagal
      if (req.file) {
        await deleteFile(req.file.path);
      }

      if (error instanceof yup.ValidationError) {
        const errors = error.errors.join(", ");
        return _next(new CustomError(400, errors));
      }
      _next(error);
    }
  },

  UpdateSurat: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const surat: ISurat = req.body;

      const updated = await SuratService.UpdateSurat(id, surat);

      res.status(200).json({
        success: true,
        message: "Surat updated successfully",
        data: updated,
      });
    } catch (error) {
      _next(error);
    }
  },

  DeleteSurat: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const surat = await SuratService.DeleteSurat(id);

      res.status(200).json({
        success: true,
        message: "Surat deleted successfully",
        data: surat,
      });
    } catch (error) {
      _next(error);
    }
  },
};

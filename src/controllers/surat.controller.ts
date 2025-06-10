import { NextFunction, Request, Response } from "express";
import { SuratService } from "../services/surat.service";
import { CustomError } from "../utils/customError";
import { createSuratSchema } from "../utils/validations/surat.validation";
import { ISurat } from "../interfaces/surat.interface";
import * as yup from "yup";

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
    try {
      if (!req.file) {
        throw new CustomError(400, "No File Uploaded!");
      }

      // Konversi file ke Data URI
      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;

      // Proses upload ke Cloudinary dan validasi ke model ML
      const { cloudinaryUrl, publicId, data } = await SuratService.SingleUpload(
        fileBuffer,
        fileName
      );

      res.status(200).json({
        success: true,
        message: "File uploaded and validated successfully",
        data: {
          cloudinaryUrl, // URL file di Cloudinary
          publicId, // Public ID file di Cloudinary
          data, // Hasil prediksi dari model ML
        },
      });
    } catch (error) {
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

  DeleteCloudinaryFile: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    console.log("Deleting file from Cloudinary...");
    const { publicId } = req.body.data;
    console.log("Public ID to delete:", publicId);

    try {
      await SuratService.DeleteCloudinaryFile(publicId);

      res.status(200).json({
        success: true,
        message: "File deleted successfully from Cloudinary",
      });
    } catch (error) {
      _next(error);
    }
  },
};

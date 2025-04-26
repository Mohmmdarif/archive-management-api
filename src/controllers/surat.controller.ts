import { NextFunction, Request, Response } from "express";
import { SuratService } from "../services/surat.service";
import { CustomError } from "../utils/customError";
import { createSuratSchema } from "../utils/validations/surat.validation";
import { ISurat } from "../interfaces/surat.interface";
import path from "path";
import fs from "fs";
import * as yup from "yup";

export const SuratController = {
  SingleUpload: async (req: Request, res: Response, _next: NextFunction) => {
    let filePath: string | null = null;
    try {
      // const dataToValidate = {
      //   ...req.body,
      //   file: req.file,
      // };
      // await createSuratSchema.validate(dataToValidate as ISurat, {
      //   abortEarly: false,
      // });
      // const cleanNoSurat = req.body.no_surat.replace(/\//g, "-");
      const ext = path.extname(req.file!.originalname);
      const originalName = req.file!.originalname.replace(ext, "");
      const fileName = `${Date.now()}-${originalName}-${ext}`;

      filePath = path.join("uploads/", fileName);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      fs.writeFile(filePath, req.file!.buffer, (err) => {
        if (err) throw err;
      });

      // console.log("File saved to:", filePath);
      // const suratData: ISurat = {
      //   ...req.body,
      //   id_type_surat: parseInt(req.body.id_type_surat),
      //   id_jenis_surat: parseInt(req.body.id_jenis_surat),
      //   id_kriteria_surat: parseInt(req.body.id_kriteria_surat),
      //   filename: fileName,
      //   path_file: filePath,
      // };
      const surat = await SuratService.SingleUpload(filePath);

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: surat,
      });
    } catch (error) {
      // Hapus file jika gagal
      if (filePath) {
        await fs.promises.unlink(filePath).catch(() => {});
      }

      if (error instanceof yup.ValidationError) {
        const errors = error.errors.join(", ");
        return _next(new CustomError(400, errors));
      }
      _next(error);
    }
  },
};

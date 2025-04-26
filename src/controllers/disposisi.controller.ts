import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { CustomError } from "../utils/customError";
import { createDisposisiSchema } from "../utils/validations/disposisi.validation";
import { IDisposisiPayload } from "../interfaces/disposisi.interface";
import { DisposisiService } from "../services/disposisi.service";

export const DisposisiController = {
  CreateDisposisi: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      await createDisposisiSchema.validate(req.body as IDisposisiPayload, {
        abortEarly: false,
        stripUnknown: true,
      });

      const disposisi = await DisposisiService.CreateDisposisi(
        req.body as IDisposisiPayload
      );

      res.status(201).json({
        success: true,
        message: "Disposisi created successfully",
        data: disposisi,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed!", error.errors));
      }
      _next(error);
    }
  },

  DisposisiById: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const id = req.params.id;
      const disposisi = await DisposisiService.DisposisiById(id);

      res.status(200).json({
        success: true,
        message: "Disposisi successfully retrieved",
        data: disposisi,
      });
    } catch (error) {
      _next(error);
    }
  },

  DisposisiBySuratMasuk: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const suratMasukId = req.params.suratMasukId;
      const disposisi = await DisposisiService.DisposisiBySuratMasuk(
        suratMasukId
      );

      res.status(200).json({
        success: true,
        message: "Disposisi successfully retrieved",
        data: disposisi,
      });
    } catch (error) {
      _next(error);
    }
  },
};

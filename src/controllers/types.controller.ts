import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import * as Yup from "yup";
import { typesSchema } from "../utils/validations/detail.validation";
import { ITypePayload } from "../interfaces/detail.interface";
import { TypesService } from "../services/type.service";

export const TypesController = {
  GetTypes: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const types = await TypesService.GetTypes();

      res.status(200).json({
        success: true,
        message: "Success get all types",
        data: types,
      });
    } catch (error) {
      _next(error);
    }
  },

  CreateTypes: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      await typesSchema.validate(req.body as ITypePayload, {
        abortEarly: false,
      });

      const type = await TypesService.CreateType(req.body as ITypePayload);

      res.status(201).json({
        success: true,
        message: "Success create type",
        data: type,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed!", error.errors));
      }
      _next(error);
    }
  },

  UpdateTypes: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const typeId = req.params.id;

      await typesSchema.validate(req.body as ITypePayload, {
        abortEarly: false,
      });

      const updatedType = await TypesService.UpdateType(
        parseInt(typeId),
        req.body as ITypePayload
      );

      res.status(200).json({
        success: true,
        message: "Success update type",
        data: updatedType,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed!", error.errors));
      }
      _next(error);
    }
  },

  DeleteTypes: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const typeId = req.params.id;

      const deletedType = await TypesService.DeleteType(parseInt(typeId));

      res.status(200).json({
        success: true,
        message: "Success delete type",
        data: deletedType,
      });
    } catch (error) {
      _next(error);
    }
  },
};

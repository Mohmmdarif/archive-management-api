import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import * as Yup from "yup";
import { criteriaSchema } from "../utils/validations/detail.validation";
import { ICriteriaPayload } from "../interfaces/detail.interface";
import { CriteriaService } from "../services/criteria.service";

export const CriteriaController = {
  GetCriteria: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const criteria = await CriteriaService.GetCriterias();

      res.status(200).json({
        success: true,
        message: "Success get all criteria",
        data: criteria,
      });
    } catch (error) {
      _next(error);
    }
  },

  CreateCriteria: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      await criteriaSchema.validate(req.body as ICriteriaPayload, {
        abortEarly: false,
      });

      const criteria = await CriteriaService.CreateCriteria(
        req.body as ICriteriaPayload
      );

      res.status(201).json({
        success: true,
        message: "Success create criteria",
        data: criteria,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed!", error.errors));
      }
      _next(error);
    }
  },

  UpdateCriteria: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const criteriaId = req.params.id;

      await criteriaSchema.validate(req.body as ICriteriaPayload, {
        abortEarly: false,
      });

      const updatedCriteria = await CriteriaService.UpdateCriteria(
        parseInt(criteriaId),
        req.body as ICriteriaPayload
      );

      res.status(200).json({
        success: true,
        message: "Success update criteria",
        data: updatedCriteria,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed!", error.errors));
      }
      _next(error);
    }
  },

  DeleteCriteria: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const criteriaId = req.params.id;

      const deletedCriteria = await CriteriaService.DeleteCriteria(
        parseInt(criteriaId)
      );

      res.status(200).json({
        success: true,
        message: "Success delete criteria",
        data: deletedCriteria,
      });
    } catch (error) {
      _next(error);
    }
  },
};

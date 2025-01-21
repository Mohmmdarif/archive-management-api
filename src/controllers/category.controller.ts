import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CustomError } from "../utils/customError";
import * as Yup from "yup";
import { categorySchema } from "../utils/validations/category.validation";
import { ICategoryPayload } from "../interfaces/category.interface";

export const CategoryController = {
  GetCategories: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const categories = await CategoryService.GetCategories();

      res.status(200).json({
        success: true,
        message: "Success get all categories",
        data: categories,
      });
    } catch (error) {
      _next(error);
    }
  },

  CreateCategory: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      await categorySchema.validate(req.body as ICategoryPayload, {
        abortEarly: false,
      });

      const category = await CategoryService.CreateCategory(
        req.body as ICategoryPayload
      );

      res.status(201).json({
        success: true,
        message: "Success create category",
        data: category,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },

  UpdateCategory: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const categoryId = req.params.id;

      await categorySchema.validate(req.body as ICategoryPayload, {
        abortEarly: false,
      });

      const updatedCategory = await CategoryService.UpdateCategory(
        parseInt(categoryId),
        req.body as ICategoryPayload
      );

      res.status(200).json({
        success: true,
        message: "Success update category",
        data: updatedCategory,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },

  DeleteCategory: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const categoryId = req.params.id;

      const deletedCategory = await CategoryService.DeleteCategory(
        parseInt(categoryId)
      );

      res.status(200).json({
        success: true,
        message: "Success delete category",
        data: deletedCategory,
      });
    } catch (error) {
      _next(error);
    }
  },
};

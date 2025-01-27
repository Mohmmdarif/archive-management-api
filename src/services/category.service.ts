import { ICategoryPayload } from "../interfaces/detail.interface";
import { CategoryRepository } from "../repositories/category.repository";
import { CustomError } from "../utils/customError";

export const CategoryService = {
  GetCategories: async () => {
    const categories = await CategoryRepository.FindAll();

    return categories;
  },

  CreateCategory: async (payload: ICategoryPayload) => {
    const category = await CategoryRepository.Create(payload);

    return category;
  },

  UpdateCategory: async (categoryId: number, payload: ICategoryPayload) => {
    const category = await CategoryRepository.FindById(categoryId);

    if (!category) {
      throw new CustomError(403, "Type not found");
    }

    const updatedCategory = await CategoryRepository.Update(
      categoryId,
      payload
    );

    return updatedCategory;
  },

  DeleteCategory: async (categoryId: number) => {
    const category = await CategoryRepository.FindById(categoryId);

    if (!category) {
      throw new CustomError(403, "Type not found");
    }

    await CategoryRepository.Delete(categoryId);

    return;
  },
};

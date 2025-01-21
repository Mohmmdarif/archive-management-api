import { ICategoryPayload } from "../interfaces/category.interface";
import { CategoryRepository } from "../repositories/category.repository";

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
    const updatedCategory = await CategoryRepository.Update(
      categoryId,
      payload
    );

    return updatedCategory;
  },

  DeleteCategory: async (categoryId: number) => {
    await CategoryRepository.Delete(categoryId);

    return;
  },
};

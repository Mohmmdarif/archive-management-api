import { ITypePayload } from "../interfaces/detail.interface";
import { TypesRepository } from "../repositories/type.repository";
import { CustomError } from "../utils/customError";

export const TypesService = {
  GetTypes: async () => {
    const types = await TypesRepository.FindAll();

    return types;
  },

  CreateType: async (payload: ITypePayload) => {
    const type = await TypesRepository.Create(payload);

    return type;
  },

  UpdateType: async (typeId: number, payload: ITypePayload) => {
    const type = await TypesRepository.FindById(typeId);

    if (!type) {
      throw new CustomError(403, "Type not found");
    }

    const updatedType = await TypesRepository.Update(typeId, payload);

    return updatedType;
  },

  DeleteType: async (typeId: number) => {
    const type = await TypesRepository.FindById(typeId);

    if (!type) {
      throw new CustomError(403, "Type not found");
    }

    await TypesRepository.Delete(typeId);

    return;
  },
};

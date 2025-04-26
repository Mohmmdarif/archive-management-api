import { ICriteriaPayload } from "../interfaces/detail.interface";
import { CriteriaRepository } from "../repositories/criteria.repository";
import { CustomError } from "../utils/customError";

export const CriteriaService = {
  GetCriterias: async () => {
    const criterias = await CriteriaRepository.FindAll();

    return criterias;
  },

  CreateCriteria: async (payload: ICriteriaPayload) => {
    const criteria = await CriteriaRepository.Create(payload);

    return criteria;
  },

  UpdateCriteria: async (criteriaId: number, payload: ICriteriaPayload) => {
    const criteria = await CriteriaRepository.FindById(criteriaId);

    if (!criteria) {
      throw new CustomError(404, "Criteria not found");
    }

    const updatedCriteria = await CriteriaRepository.Update(
      criteriaId,
      payload
    );

    return updatedCriteria;
  },

  DeleteCriteria: async (criteriaId: number) => {
    const criteria = await CriteriaRepository.FindById(criteriaId);

    if (!criteria) {
      throw new CustomError(404, "Criteria not found");
    }

    await CriteriaRepository.Delete(criteriaId);

    return;
  },
};

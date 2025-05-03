import { ClassifierRepository } from "../repositories/classifier.repository";

export const ClassifierService = {
  GetClassifier: async () => {
    const classifier = await ClassifierRepository.FindAll();

    return classifier;
  },
};

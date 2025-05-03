import { NextFunction, Request, Response } from "express";
import { ClassifierService } from "../services/classifier.service";

export const ClassifierController = {
  GetClassifier: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const classifier = await ClassifierService.GetClassifier();

      res.status(200).json({
        success: true,
        message: "Success get all classifier",
        data: classifier,
      });
    } catch (error) {
      _next(error);
    }
  },
};

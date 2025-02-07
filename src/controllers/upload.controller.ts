import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/upload.service";

export const UploadController = {
  SingleUpload: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const fileUploaded = await UploadService.SingleUpload(req.file);
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: fileUploaded,
      });
    } catch (error) {
      _next(error);
    }
  },
};

import multer from "multer";
import path from "path";
import { Request } from "express";
import { CustomError } from "../utils/customError";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".pdf") {
    return cb(new CustomError(400, "Hanya file PDF yang diperbolehkan!"));
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });

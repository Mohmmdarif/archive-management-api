import multer, { memoryStorage } from "multer";
import path from "path";
import { Request } from "express";
import { CustomError } from "../utils/customError";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     const baseName = path.basename(file.originalname, ext);
//     const safeFileName = baseName ? baseName : "file"; // Jika kosong, beri nama "file"
//     const fileName = `${Date.now()}-${safeFileName}${ext}`;
//     cb(null, fileName);
//   },
// });

const storage = memoryStorage();

const upload = multer({
  storage,
  dest: "uploads/",
  fileFilter: (_req: Request, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExt = [".pdf"];

    if (!allowedExt.includes(ext)) {
      return cb(new CustomError(400, "File type is not supported"));
    }

    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;

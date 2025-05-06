// import multer from "multer";
// import path from "path";
// import { Request } from "express";
// import { CustomError } from "../utils/customError";

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

// const fileFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   const allowedExt = [".pdf"];

//   if (!allowedExt.includes(ext)) {
//     return cb(new CustomError(400, "File type is not supported"));
//   }

//   cb(null, true);
// };
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5 MB
//   },
// });

// export default upload;

import multer from "multer";
import { CustomError } from "../utils/customError";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname.split(".").pop() || "").toLowerCase();
    const allowedExt = ["pdf"];

    if (!allowedExt.includes(ext)) {
      return cb(new CustomError(400, "File type is not supported"));
    }

    cb(null, true);
  },
});

export const single = upload.single("file");

export default {
  single,
};

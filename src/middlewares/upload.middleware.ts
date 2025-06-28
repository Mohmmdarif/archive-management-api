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

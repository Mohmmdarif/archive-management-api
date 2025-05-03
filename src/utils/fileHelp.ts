import fs from "fs";
import path from "path";

export const deleteFile = (filePath: string) => {
  const fullPath = path.join(__dirname, "../uploads", filePath); // Atur sesuai lokasi file Anda
  fs.unlinkSync(fullPath); // Menghapus file
};

import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "";
export const PORT: number = parseInt(process.env.PORT || "3000");
export const BASE_URL_MODEL_API: string = process.env.BASE_URL_MODEL_API || "";
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || "";
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || "";

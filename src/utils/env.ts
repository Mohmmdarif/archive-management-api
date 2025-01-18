import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "";
export const PORT: number = parseInt(process.env.PORT || "3000");

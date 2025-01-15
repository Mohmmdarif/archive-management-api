import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Yay! Your API is working!");
});

app.use("/api/auth", authRoutes);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on <localhost:${port}>`);
});

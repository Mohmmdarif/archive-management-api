import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { JWT_SECRET, PORT } from "./utils/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Yay! Your API is working!");
});

app.use("/api/auth", authRoutes);

app.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
  }
);

// Start the server
const port = PORT;

app.listen(port, () => {
  console.log(`Server is running on <localhost:${port}>`);
});

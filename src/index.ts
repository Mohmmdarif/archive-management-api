import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { PORT } from "./utils/env";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Yay! Your API is working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

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

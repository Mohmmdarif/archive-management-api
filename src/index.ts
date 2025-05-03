import express, { Express, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { PORT } from "./utils/env";
import {
  authRoutes,
  userRoutes,
  categoryRoutes,
  typesRoutes,
  criteriaRoutes,
  suratRoutes,
  disposisiRoutes,
  classifierRoutes,
  dashboardRoutes,
} from "./routes/index";
import path from "path";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // URL of the Frontend
    credentials: true, // Required to allow cookies with the requests
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Yay! Your API is working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/types", typesRoutes);
app.use("/api/classifier", classifierRoutes);
app.use("/api/criterias", criteriaRoutes);
app.use("/api/disposisi", disposisiRoutes);
app.use("/api/surat", suratRoutes);
app.use("/api/dashboard", dashboardRoutes);

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

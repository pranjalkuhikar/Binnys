import express from "express";
import indexRoute from "./routes/index.route.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
import { config } from "./configs/config.js";

const app = express();
// app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8081"],
    credentials: true,
  })
);
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: Number(config.WINDOW_MS),
  max: Number(config.MAX),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(apiLimiter);
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", indexRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  if (config.NODE_ENV === "production") {
    res.status(statusCode).json({ message: "An unexpected error occurred." });
  } else {
    res.status(statusCode).json({ message: message, stack: err.stack });
  }
});

app.use("/test", async (req, res) => {
  try {
    res.status(200).json({ message: "Hello World" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default app;

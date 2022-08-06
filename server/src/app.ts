import express, { Express } from "express";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import dotenv from "dotenv";
import cors from "cors";

// router
import authRouter from "./modules/auth/authRouter";

// middleware
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config({ path: "./config.env" });
const app: Express = express();

app.use(cors());

// SERCE HEADER
app.use(helmet());

// LIMIT REQUEST
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// PREVENT BAD CODE IN DB
app.use(mongoSanitize());

// PREVENT BAD PARAMETER FROM URL LIKE DOUBLE PARAMES
app.use(
  hpp({
    whitelist: ["duration"],
  })
);

app.use(`${process.env.API_VERSION}/auth`, authRouter);

// Error Middleware
app.use(errorMiddleware);

export default app;

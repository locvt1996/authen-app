// types
import { Response, Request, NextFunction } from "express";

// helpers
import AppError, { AppErrorInterface } from "../helpers/appError";

const sendErrorPro = (res: Response, error: AppErrorInterface) => {
  const { statusCode = 500, status = "error", message } = error;

  if (error.isOperation) {
    res.status(statusCode).json({ success: false, status, message });
  } else {
    console.error("THIS IS ERROR: ", error);
    res.status(500).json({
      success: false,
      status: "error",
      message: "some thing is wrong",
    });
  }
};

const handleCastErrorDB = (error: AppErrorInterface) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (error: AppErrorInterface) => {
  const message = `Item existed: ${Object.keys(error.keyValue)?.join(
    ","
  )}. Please use another value!`;
  console.log(new AppError(message, 400));

  return new AppError(message, 400);
};

const handleValidationDB = (error: AppErrorInterface) => {
  const errors = Object.values(error.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token!", 401);

const handleJWTExpiredError = () => new AppError("Your token is expired!", 401);

const getErrorProduction = (error: AppErrorInterface) => {
  let errorFormat;

  if (error.stack?.startsWith("CastError"))
    errorFormat = handleCastErrorDB(error);
  if (error.code === 11000) errorFormat = handleDuplicateFieldDB(error);
  if (error.name === "ValidationError") errorFormat = handleValidationDB(error);
  if (error.name === "JsonWebTokenError") errorFormat = handleJWTError();
  if (error.name === "TokenExpiredError") errorFormat = handleJWTExpiredError();

  return errorFormat ?? error;
};

const globalError = (
  err: AppErrorInterface,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const error = getErrorProduction(err);
  sendErrorPro(res, error);
};

export default globalError;

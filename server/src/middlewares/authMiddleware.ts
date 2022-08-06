import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// helpers
import { catchAsync } from "../helpers/utils";
import AppError from "../helpers/appError";

// types
import { UserDoc } from "../modules/user/type";
import User from "../modules/user/userModel";

const { promisify } = require("util");

export const getUserFromToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      next(new AppError(`You are not login`, 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = (await User.findById(decoded.id)) as UserDoc;

    if (!user) {
      next(new AppError(`The user belonging this token no exits`, 401));
    }

    req.body.user = user;

    next();
  }
);

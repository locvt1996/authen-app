import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { UserDoc } from "../user/type";
import User from "../user/userModel";

import { catchAsync, TimeOneDate } from "../../helpers/utils";
import AppError from "../../helpers/appError";

const signJwt = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const setCookieToClient = (res: Response, token: string) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * TimeOneDate),
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);
};

const sendTokenToCliend = (res: Response, user: UserDoc) => {
  const token = signJwt(user._id);
  setCookieToClient(res, token);

  res.status(200).json({
    status: "success",
    token,
    userInfo: {
      email: user.email,
      id: user._id,
    },
  });
};

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let user;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    user = (await User.findOne({ email }).select("+password")) as UserDoc;

    if (user && !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password!", 401));
    }

    sendTokenToCliend(res, user);
  }
);

export const loginFacebook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.body;
    let user;

    if (!accessToken) {
      return next(new AppError("Some thing went wrong!", 400));
    }

    const result = await axios({
      method: "get",
      url: `https://graph.facebook.com/me?fields=email&access_token=${accessToken}`,
    });

    const { email } = result?.data;

    user = await User.findOne({ email });

    if (!user)
      user = await User.create({
        email,
        password: email,
      });

    sendTokenToCliend(res, user);
  }
);

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    await User.create({
      email,
      password,
    });

    res.status(200).json({
      status: "success",
      message: "Register success",
    });
  }
);

export const tryLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    res.status(200).json({
      status: "success",
      userInfo: {
        email: user.email,
        id: user._id,
      },
    });
  }
);

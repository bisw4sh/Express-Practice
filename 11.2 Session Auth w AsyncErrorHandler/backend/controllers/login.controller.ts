import { NextFunction, Request, Response } from "express";
import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { AppError } from "../middleware/error.js";

export const login = asyncErrorHandler(
  async ({
    req,
    res,
    next,
    user,
    password,
  }: {
    req: Request;
    res: Response;
    next: NextFunction;
    user: string;
    password: string;
  }) => {
    const user_from_db = await Users.findOne({ username: user });

    if (!user_from_db) {
      const err = new AppError("User doesn't exist", 400);
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user_from_db!.password);

    if (!isMatch) {
      const err = new AppError("Wrong Password", 401);
      return next(err);
    }

    req.session.user = user;
    req.session.role = user_from_db?.role;
    res.cookie("user", user, { maxAge: 900000, httpOnly: true });

    return res.status(200).json({ user, success: true, message: "Logged in" });
  }
);

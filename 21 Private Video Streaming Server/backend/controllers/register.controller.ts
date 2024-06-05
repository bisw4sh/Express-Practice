import { Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Users } from "../models/Users";
import { AppError } from "../middleware/error";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

const salt_rounds = parseInt(process.env?.SALT_ROUNDS || "10", 10);

export const register = asyncErrorHandler(
  async ({
    user,
    password,
    res,
    next,
  }: {
    user: string;
    password: string;
    res: Response;
    next: NextFunction;
  }) => {
    const user_from_db = await Users.findOne({ username: user });

    if (user_from_db) {
      const err = new AppError("User already exist", 406);
      return next(err);
    }

    const salt = await bcrypt.genSalt(salt_rounds);
    const hash = await bcrypt.hash(password, salt);

    const data = await Users.create({
      username: user,
      password: hash,
      id: uuidv4(),
    });

    return res.status(200).json({
      username: data.username,
      id: data.id,
      success: true,
      message: "User has been created",
    });
  }
);

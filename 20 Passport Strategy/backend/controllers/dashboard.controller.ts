import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { AppError } from "../middleware/error";

export const dashboard = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.user) {
      const error = new AppError("No session atttributes", 401);
      return next(error);
    }

    //Table of Sessions
    // console.table(req.session ?? "SESSION {}");
    // Table of Cookies
    // console.table(req?.cookies);
    // console.log(req?.cookies["connect.sid"]); // It isn't allowed

    res.status(200).json({
      user: req?.session?.passport?.user?.username,
      success: true,
      message: req?.session?.passport?.user?.username ? "You're authenticated" : "Error occurred",
    });
  }
);

import { Response, Request, Router, NextFunction } from "express";
import passport from "passport";
import { Users } from "../models/Users";
import { AppError } from "../middleware/error";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

const router = Router();

router.post(
  "/",
  passport.authenticate("local"),
  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await Users.findOne({ username: req.body.user });

    // console.log("From req.user", req.user);
    if (!user) {
      const error = new AppError("No such user", 404);
      next(error);
    }

    res.status(200).json({
      user: req?.session?.passport?.user?.username,
      success: true,
      message: "Logged in",
    });
  })
);

export default router;

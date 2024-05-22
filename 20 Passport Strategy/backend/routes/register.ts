import express, { Response, Request, NextFunction } from "express";
import { register } from "../controllers/register.controller";
import { AppError } from "../middleware/error";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

const router = express.Router();

router.post(
  "/",
  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [user, password] = [
      req.body.user as string,
      req.body.password as string,
    ];

    if (!user || !password) {
      const err = new AppError("Username or password hasn't been set", 400);
      return next(err);
    }

    await register({ user, password, res, next });
  })
);

export default router;

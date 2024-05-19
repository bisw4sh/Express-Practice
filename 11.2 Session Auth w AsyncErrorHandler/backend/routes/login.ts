import { Response, Request, Router, NextFunction } from "express";
import { login } from "../controllers/login.controller";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { AppError } from "../middleware/error";

type UserInfo = [string, string];

const router = Router();

router.post(
  "/",
  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.user || !req.body.password) {
      const err = new AppError("Missing user or password in request body", 400);
      return next(err);
    }

    const [user, password]: UserInfo = [req.body?.user, req.body?.password];
    await login({ req, res, user, password });
  })
);

export default router;

import { Router, Response, Request, NextFunction } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { AppError } from "../middleware/error";

const router = Router();

router.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.role !== "admin") {
      const error = new AppError("You don't have privileges", 403);
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Admin Panel shall be constructed" });
  })
);

export default router;

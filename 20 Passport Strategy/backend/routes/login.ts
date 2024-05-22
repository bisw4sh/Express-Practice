import { Response, Request, Router, NextFunction } from "express";
import passport from "passport";
import { Users } from "../models/Users";
import { AppError } from "../middleware/error";

const router = Router();

router.post(
  "/",
  passport.authenticate("local"),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await Users.findOne({ username: req.body.user });
    if (!user) {
      const error = new AppError("No such user", 404);
      next(error)
    }
    req.session.role = user.role;
    res
      .status(200)
      .json({ user: req.body.user, success: true, message: "Logged in" });
  }
);

export default router;

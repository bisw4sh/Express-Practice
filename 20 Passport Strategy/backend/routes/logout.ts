import express, { Response, Request, NextFunction } from "express";
import { AppError } from "../middleware/error";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.table(req.cookies);
  console.log(req.session.user);

  req.logOut((err) => {
    if (err) {
      const err = new AppError("Kaya malum", 500);
      return next(err);
    }

    console.log("Ho gaya ");
  });

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error destroying session");
    } else {
      // Clear the cookie
      // res.clearCookie("data");
      res.clearCookie("session_id");
      res.clearCookie("user");
      res.send("Session and cookie have been destroyed");
    }
  });
});

export default router;

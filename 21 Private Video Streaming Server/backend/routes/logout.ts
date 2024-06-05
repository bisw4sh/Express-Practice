import express, { Response, Request, NextFunction } from "express";
import { AppError } from "../middleware/error";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import "colors";

const router = express.Router();

router.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    // console.table(req.cookies);

    req.logout((err) => {
      if (err) {
        const err = new AppError("Kaya malum", 500);
        return next(err);
      }
      //Checking if session has been destroyed
      console.table(req.session);
      return res.status(205).send("Logged out");
    });

    // Destroy the session
    // req.session.destroy((err) => {
    //   console.log("here tiooo");
    //   if (err) {
    //     console.log(err);
    //     res.status(500).send("Error destroying session");
    //   } else {
    //     console.log("Successful session destruction");
    //     // Clear the cookie
    //     // res.clearCookie("data");
    //     // res.clearCookie("user");
    //     res.send("Session and cookie have been destroyed");
    //   }
    // });
  })
);

export default router;

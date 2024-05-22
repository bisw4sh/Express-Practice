import { Router, Response, Request } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

const router = Router();

router.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ message: "Admin Panel shall be constructed" });
  })
);

export default router;

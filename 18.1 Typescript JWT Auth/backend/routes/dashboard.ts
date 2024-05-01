import express, { Response, Request } from "express";
// import { Users } from "../models/Users";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (!process.env.JWT_SECRET) throw new Error("No JWT Secret");

  try {
    const decoded = jwt.verify(
      req.cookies.jwt_string,
      process.env.JWT_SECRET
    ) as JwtPayload;
    res.json({ user: decoded?.username, role: decoded?.role });
  } catch (error) {
    console.log("There must have been an error here");
    res.status(500).json({ user: req.cookies.user, message: error });
  }
});

export default router;

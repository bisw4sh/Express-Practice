import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string;
      role?: string;
    }
  }
}

const verification = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.JWT_SECRET) throw new Error("No JWT secret key");

    const { username, role } = jwt.verify(
      req.cookies.jwt_string,
      process.env.JWT_SECRET
    ) as JwtPayload;

    req.user = username;
    req.role = role;
    next();
  } catch (error) {
    throw new Error("No JWT Authentication");
  }
};

export default verification;

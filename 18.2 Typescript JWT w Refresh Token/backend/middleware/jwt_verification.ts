import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { token_restoration } from "./token_restoration";
import { get_public_key } from "../controllers/get_keys";

const verification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.jwt_string || !req.cookies.refresh_token) {
      return res.status(401).json({ error: "no tokens" });
    }
    const public_key = await get_public_key();

    const { username, role } = jwt.verify(req.cookies.jwt_string, public_key, {
      algorithms: ["RS256"],
    }) as JwtPayload;

    if (username && role) {
      req.user = username;
      req.role = role;
    }
    console.log(username, role);
    next();
  } catch (access_error) {
    if (access_error instanceof jwt.TokenExpiredError) {
      try {
        const public_key = await get_public_key();

        jwt.verify(req.cookies.refresh_token, public_key, {
          algorithms: ["RS256"],
        }) as JwtPayload;

        //Access Token expired
        await token_restoration(req, res);

        return next();
      } catch (refresh_error) {
        if (refresh_error instanceof jwt.TokenExpiredError) {
          //Both Tokens expired

          await token_restoration(req, res);

          return next();
        } else if (
          refresh_error instanceof jwt.JsonWebTokenError ||
          refresh_error instanceof jwt.NotBeforeError
        ) {
          res.clearCookie("jwt_string").clearCookie("refresh_token");
          return res.status(401).json({ error: "Invalid Refresh Token" });
        } else {
          res.clearCookie("jwt_string").clearCookie("refresh_token");
          return res.status(401).json({ error: refresh_error });
        }
      }
    } else if (
      access_error instanceof jwt.JsonWebTokenError ||
      access_error instanceof jwt.NotBeforeError
    ) {
      res.clearCookie("jwt_string").clearCookie("refresh_token");
      return res.status(401).json({ error: "Invalid JWT" });
    } else {
      console.log("Unknown JWT error:", access_error.message);
      res.clearCookie("jwt_string").clearCookie("refresh_token");
      return res.status(401).json({
        error: "Unknown JWT error",
      });
    }
  }
};

export default verification;

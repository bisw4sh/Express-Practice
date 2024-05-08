import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RefreshTokens } from "../models/RefreshTokens";
import { generate_jwt } from "../controllers/generateJWT";
import { append_tokens } from "../controllers/get_recorder";

const ACCESS_TOKEN_TIME = 10;
const REFRESH_TOKEN_TIME = 20;

export const token_restoration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refresh_token = await RefreshTokens.findOne({
      token: req.cookies.refresh_token,
    });

    if (!refresh_token) throw new Error("Forged Refresh Token");

    const decoded = jwt.decode(refresh_token!.token) as JwtPayload;

    const NEW_ACCESS_TOKEN = await generate_jwt({
      username: decoded.username,
      role: decoded.role,
      expiration: ACCESS_TOKEN_TIME,
    });

    const NEW_REFRESH_TOKEN = await generate_jwt({
      username: decoded.username,
      role: decoded.role,
      expiration: REFRESH_TOKEN_TIME,
    });

    await RefreshTokens.findOneAndUpdate(
      { token: refresh_token.token },
      { token: NEW_REFRESH_TOKEN, expiration: Date.now() + 10000 }
    );

    await append_tokens(`\nACCESS TOKEN : \n${NEW_ACCESS_TOKEN}\n`);
    await append_tokens(`\nREFRESH TOKEN : \n${NEW_REFRESH_TOKEN}\n`);

    res
      .cookie("jwt_string", NEW_ACCESS_TOKEN)
      .cookie("refresh_token", NEW_REFRESH_TOKEN);
    return next();
  } catch (error) {
    console.error("Error regenerating tokens:", error.message);
    res.status(500).json({ error: "Failed to regenerate tokens" });
    // return;
  }
};

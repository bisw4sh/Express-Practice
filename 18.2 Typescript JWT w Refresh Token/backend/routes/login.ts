import express, { Response, Request } from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/Users.js";
import { RefreshTokens } from "../models/RefreshTokens";
import { generate_jwt } from "../controllers/generateJWT";
import { write_tokens, append_tokens } from "../controllers/get_recorder.js";

type UserInfo = [string, string];
const router = express.Router();

const ACCESS_TOKEN_TIME = 10;
const REFRESH_TOKEN_TIME = 20;

router.post("/", async (req: Request, res: Response) => {
  try {
    const [user, password]: UserInfo = [req.body?.user, req.body?.password];

    if (!user || !password)
      res.status(401).json({ user, message: "Missing credentials" });

    const user_from_db = await Users.findOne({ username: user });

    if (!user_from_db)
      res.status(404).json({ user, message: "User isn't registered" });

    if (user_from_db?.username === user) {
      const isMatch = await bcrypt.compare(password, user_from_db!.password);

      if (isMatch) {
        const JWT_STRING = await generate_jwt({
          username: user,
          role: user_from_db.role,
          expiration: ACCESS_TOKEN_TIME,
        });

        const REFRESH_TOKEN = await generate_jwt({
          username: user,
          role: user_from_db.role,
          expiration: REFRESH_TOKEN_TIME,
        });

        await RefreshTokens.findOneAndUpdate(
          {
            user: user_from_db._id,
          },
          {
            user: user_from_db._id,
            token: REFRESH_TOKEN,
            expiration: Date.now() + REFRESH_TOKEN_TIME * 1000,
          },
          { new: true, upsert: true }
        );

        res.cookie("jwt_string", JWT_STRING);
        res.cookie("refresh_token", REFRESH_TOKEN);

        //For debugging purposes
        await write_tokens(`ACCESS TOKEN : \n${JWT_STRING}\n`);
        await append_tokens(`\nREFRESH TOKEN : \n${REFRESH_TOKEN}\n`);

        res.status(200).json({ user, jwt: JWT_STRING, message: "success" });
      } else {
        res.status(401).json({ user, message: "Invalid password" });
      }
    } else {
      res.status(401).json({ user, message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;

import express, { Response, Request } from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/Users.js";
import { generate_jwt } from "../controllers/generateJWT";

type UserInfo = [string, string];
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const [user, password]: UserInfo = [req.body?.user, req.body?.password];

  if (!user || !password) res.json({ user, message: "Missing credentials" });

  const user_from_db = await Users.findOne({ username: user });

  if (!user_from_db) res.json({ user, message: "User is registered" });

  if (user_from_db?.username === user) {
    const isMatch = await bcrypt.compare(password, user_from_db!.password);

    if (isMatch) {
      const JWT_STRING = generate_jwt({
        username: user,
        role: user_from_db.role,
      });
      res.cookie("jwt_string", JWT_STRING);
      res.json({ user, jwt: JWT_STRING, message: "success" });
    } else {
      res.status(401).json({ user, message: "Invalid password" });
    }
  } else {
    res.status(401).json({ user, message: "User doesn't exist" });
  }
});

export default router;

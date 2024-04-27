import express, { Response, Request } from "express";
import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";

type UserInfo = [string, string];
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const [user, password]: UserInfo = [req.body?.user, req.body?.password];
  const user_from_db = await Users.findOne({ username: user });

  if (user_from_db?.username === user) {
    const isMatch = await bcrypt.compare(password, user_from_db!.password);

    if (isMatch) {
      req.session["user"] = user;
      res.cookie("user", user);
      res.json({ user, session_id: req.sessionID, message: "success" });
    } else {
      res.status(401).json({ user, message: "Invalid password" });
    }
  } else {
    res.status(401).json({ user, message: "User doesn't exist" });
  }
});

export default router;

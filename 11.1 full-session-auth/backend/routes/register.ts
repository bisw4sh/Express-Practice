import express, { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Users } from "../models/Users";

const router = express.Router();
const salt_rounds = 10;

router.post("/", async (req: Request, res: Response) => {
  const [user, password] = [
    req.body.user as string,
    req.body.password as string,
  ];

  const user_from_db = await Users.findOne({ username: user });

  if (user_from_db?.username === user) {
    res.json({ user, message: "User exists" });
  } else {
    const salt = await bcrypt.genSalt(salt_rounds);
    const hash_password = await bcrypt.hash(password, salt);

    const user_to_db = await Users.create({
      username: user,
      password: hash_password,
      id: uuidv4(),
    });
    res.json({ user_to_db, message: "User has been created" });
  }
});

export default router;

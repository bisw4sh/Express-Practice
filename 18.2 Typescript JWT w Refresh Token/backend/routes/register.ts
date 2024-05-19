import express, { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Users } from "../models/Users";

const router = express.Router();
const salt_rounds = 10;

router.post("/", async (req: Request, res: Response) => {
  if (!process.env.SALT_ROUNDS) throw new Error("Salt rounds not specified");

  const [user, password] = [
    req.body.user as string,
    req.body.password as string,
  ];

  try {
    const user_from_db = await Users.findOne({ username: user });

    if (user_from_db) {
      res.json({ user, message: "User exists" });
    } else {
      const salt = await bcrypt.genSalt(salt_rounds as number);
      console.log(salt);
      const hash_password = await bcrypt.hash(password, salt);
      console.log(hash_password);
      const user_to_db = await Users.create({
        username: user,
        password: hash_password,
        id: uuidv4(),
      });

      console.log(user_to_db);
      res.json({
        user: user_to_db.username,
        message: "User has been created",
      });
    }
  } catch (error) {
    console.log("error wala execute bha hai");
    res.json({
      user,
      message: error.message,
    });
  }
});

export default router;

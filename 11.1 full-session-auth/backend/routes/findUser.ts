import express, { Response, Request } from "express";
import { Users } from "../models/Users";

const router = express.Router();

type filtered_type = {
  username: string;
  id: string;
};

router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("--------------------------------------------");
    console.table(req?.session ?? "req.session had nothing");

    console.log(req.session.user);
    console.log(req?.cookies); //undefined
    console.log(req?.cookies?.session_id); //undefined
    console.log(`Session ID : ${req.session.id}`);
    console.log("--------------------------------------------");

    res.json({ user: req.session.user });
  } catch (error) {
    console.log("There must have been an error here");
    res.status(500).send(error);
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const users_from_db = await Users.find();
    const filtered_data: filtered_type[] = users_from_db.map((user) => {
      return { id: user.id, username: user.username };
    });

    console.log("--------------------------------------------");
    console.table(req?.session ?? "req.session had nothing");

    console.log(req.session.user);
    console.log(req?.cookies); //undefined
    console.log(req?.cookies?.session_id); //undefined
    console.log(`Session ID : ${req.session.id}`);
    console.log("--------------------------------------------");

    res.json(filtered_data);
  } catch (error) {
    console.log("There must have been an error here");
    res.status(500).send(error);
  }
});

export default router;

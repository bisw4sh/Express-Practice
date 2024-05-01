import express, { Response, Request } from "express";
// import { Users } from "../models/Users";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.role === "admin") {
    res.send("Dear Admin Sir, you are most welcome here");
  } else if (req.user && req.role) {
    res.send(`You're ${req.user} with privileges of ${req.role}`);
  } else {
    res.send(`redirect`);
  }
});

export default router;

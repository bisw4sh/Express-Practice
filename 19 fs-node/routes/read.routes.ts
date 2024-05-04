import { Router, Request, Response } from "express";
import { read_file } from "../controllers/read_file";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  const data = await read_file();
  res.send(data);
});

export default router;

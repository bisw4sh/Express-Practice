import { Router, Request, Response } from "express";
import { write_file_a1 } from "../controllers/write_file";

const router = Router();

router.get("/a1/:data_to_write", async (req: Request, res: Response) => {
  try {
    const data = await write_file_a1(req.params.data_to_write);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.get("/a2/:data_to_write", async (req: Request, res: Response) => {
  try {
    const data = await write_file_a1(req.params.data_to_write);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

export default router;

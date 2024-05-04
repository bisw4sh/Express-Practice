import { Router, Request, Response } from "express";
import { rename_file_a1, rename_file_a2 } from "../controllers/rename_file";

const router = Router();

router.get("/a1/:to", async (req: Request, res: Response) => {
  try {
    const data = await rename_file_a1(req.params.to);

    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.get("/a2/:to", async (req: Request, res: Response) => {
  try {
    const data = await rename_file_a2(req.params.to);

    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

export default router;

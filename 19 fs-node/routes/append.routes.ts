import { Router, Response, Request } from "express";
import { append_file } from "../controllers/append_file";

const router = Router();

router.get("/:data", async (req: Request, res: Response) => {
  try {
    const data = await append_file(req.params.data);
    res.send(data);
  } catch (error) {
    return error;
  }
});

export default router;

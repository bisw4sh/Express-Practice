import { Router, Response, Request } from "express";
import { delete_file } from "../controllers/delete_file";

const router = Router();

router.get("/:filename", async (req: Request, res: Response) => {
  try {
    const data = await delete_file(req.params.filename);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

export default router;

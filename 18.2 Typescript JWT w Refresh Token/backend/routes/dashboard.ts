import express, { Response, Request } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ user: req.user, role: req.role });
});

export default router;

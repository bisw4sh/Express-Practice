import express, { Response, Request } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.clearCookie("jwt_string");
  res.send("Destroyed cookie from server");
});

export default router;

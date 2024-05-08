import express, { Response, Request } from "express";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.clearCookie("jwt_string").clearCookie("refresh_token");
  res.send("Destroyed cookie from server");
});

export default router;

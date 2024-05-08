import express, { Response, Request } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    if (req.role === "admin") {
      res.status(200).send("Only admins are allowed here");
    } else {
      res.status(403).send("Unauthorized");
    }
  } catch (error) {
    res.status(401).send("No credentials");
  }
});

export default router;

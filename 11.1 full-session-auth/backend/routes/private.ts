import express, { Response, Request } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.session.user === "biswash") {
    res.send(`The private data is only being sent to ${req.session.user}`);
  } else {
    res.send(`redirect`);
  }
});

export default router;

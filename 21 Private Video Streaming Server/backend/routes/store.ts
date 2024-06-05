import { Router, Response, Request } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { Files } from "../models/Files";

const router = Router();

router.get(
  "/all",
  asyncErrorHandler(async (_: Request, res: Response) => {
    const videos = await Files.find();
    const video_details = videos.map((v) => {
      return { name: v.name, identifier: v.identifier, thumbnail: v.thumbnail };
    });
    res.json(video_details);
  })
);

export default router;

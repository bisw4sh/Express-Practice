import { Router, Response, Request } from "express";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { Files } from "../models/Files";
import { Users } from "../models/Users";

const router = Router();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get(
  "/self",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const user_details = await Users.findOne({
      username: req?.session?.passport?.user?.username,
    });
    const user_id = user_details?._id;

    const videos = await Files.find({ author: user_id });
    const video_details = videos.map((v) => {
      return { name: v.name, identifier: v.identifier, thumbnail: v.thumbnail };
    });
    res.json(video_details);
  })
);

router.get(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const filePath = path.join(__dirname, `../uploads/${req.params.id}`);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(`Requested range not satisfiable\n${start} >= ${fileSize}`);
        return;
      }

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  })
);

export default router;

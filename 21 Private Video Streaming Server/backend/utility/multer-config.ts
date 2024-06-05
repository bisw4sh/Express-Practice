import { Request } from "express";
import multer from "multer";
import path from "node:path";

//Multer config
const videoStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => cb(null, "./uploads"),
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const thumbnailStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => cb(null, "./uploads/thumbnails"),
  filename: (req: Request, file, cb) => {
    const { identifier } = req.body;
    const fileName = identifier.replace(".mp4", ".png");
    cb(null, fileName);
  },
});

export const upload = multer({ storage: videoStorage });
export const thumbnail = multer({ storage: thumbnailStorage });

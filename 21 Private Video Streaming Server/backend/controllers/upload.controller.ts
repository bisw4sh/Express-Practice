import { Request, Response } from "express";
import path from "node:path";
import { Files } from "../models/Files";
import { Users } from "../models/Users";
import { __dirname } from "../server";
import { generateThumbnail } from "../utility/thumbnail-generator";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

export const uploadHandler = asyncErrorHandler(
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
      const videoFilePath = path.join(__dirname, "uploads", req.file.filename);
      await generateThumbnail(videoFilePath, req.file.filename);

      const user_obj_Id = await Users.findOne({
        username: req?.session?.passport?.user?.username,
      });
      const thumbnail = req.file.filename.replace(".mp4", ".png");

      await Files.create({
        author: user_obj_Id?._id,
        identifier: req?.file?.filename,
        name: req?.file?.originalname,
        thumbnail: `thumbnails/${thumbnail}`,
      });

      res.send("It was well received!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error in processing");
    }
  }
);

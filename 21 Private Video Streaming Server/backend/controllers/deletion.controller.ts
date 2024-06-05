import { NextFunction, Request, Response } from "express";
import { Files } from "../models/Files";
import { AppError } from "../middleware/error";
import { __dirname } from "../server";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { check_Authorized } from "../utility/checkAuthorized";

export const deletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const identifier = req.params.identifier;

  const deletion_rights = await check_Authorized(req, identifier);

  if (!deletion_rights) {
    const error = new AppError("You don't have rights to delete", 405);
    return next(error);
  }

  try {
    const db_deletion_op = await Files.deleteOne({ identifier });
    if (db_deletion_op.deletedCount !== 1) {
      const error = new AppError("Couldn't delete from the database", 500);
      return next(error);
    }
  } catch (err) {
    const error = new AppError("Error deleting from the database", 500);
    return next(error);
  }

  try {
    await unlink(path.join(__dirname, "uploads", identifier)); // video_deletion_op
  } catch (err) {
    const error = new AppError("Error deleting video file", 500);
    return next(error);
  }

  try {
    await unlink(
      path.join(
        __dirname,
        "uploads",
        "thumbnails",
        `${identifier.replace(".mp4", ".png")}`
      )
    ); // thumbnail_deletion_op
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      // If the error is not because the file doesn't exist
      const error = new AppError("Error deleting thumbnail file", 500);
      return next(error);
    }
  }

  res.status(200).json({
    success: true,
    message: "Deletion of resources from db, fs (thumbnails, video)",
  });
};

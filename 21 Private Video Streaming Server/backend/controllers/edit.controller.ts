import { Request, Response, NextFunction } from "express";
import { check_Authorized } from "../utility/checkAuthorized";
import { AppError } from "../middleware/error";
import { Files } from "../models/Files";

export const handleEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identifier, title } = req.body;
    const update_rights = await check_Authorized(req, identifier);

    if (!update_rights) {
      const error = new AppError("You don't have rights to delete", 405);
      return next(error);
    }

    const update_title_op = await Files.findOneAndUpdate(
      { identifier },
      {
        $set: {
          name: `${title}.mp4`,
        },
      }
    );

    if (!update_title_op) {
      const error = new AppError("No update", 500);
      next(error);
    }
    console.log(update_title_op);

    res.status(200).json({
      message: "successfully updated title & thumbnail",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't update title & thumbnail",
      success: false,
    });
  }
};

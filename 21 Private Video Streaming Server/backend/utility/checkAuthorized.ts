import { Request } from "express";
import { Users } from "../models/Users";
import { Files } from "../models/Files";

export const check_Authorized = async (req: Request, vid_id: string) => {
  const role = req?.session?.passport?.user?.role;

  if (role === "admin") return true;
  const user_info = await Users.findOne({
    id: req?.session?.passport?.user?.id,
  });

  const file_info = await Files.findOne({
    author: user_info?._id,
    identifier: vid_id,
  });
  if (!file_info) return false;

  return true;
};

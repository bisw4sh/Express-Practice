import mongoose from "mongoose";
import { Users } from "../models/Users.js";
import { RefreshTokens } from "../models/RefreshTokens";

export const dbcn = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  await Users.init();
  await RefreshTokens.init();
  console.log("Connected to MongoDB!");
};

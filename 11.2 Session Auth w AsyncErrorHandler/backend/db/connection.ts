import mongoose from "mongoose";

export const dbcn = async () =>
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("Connected!"));

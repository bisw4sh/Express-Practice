import mongoose from "mongoose";

export const dbcn = async () =>
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("Connected!"));

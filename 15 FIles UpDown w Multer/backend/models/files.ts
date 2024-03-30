import mongoose from "mongoose";

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    fileName: { type: String, required: true, unique: true },
    path: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const fileInfo = mongoose.model("fileInfo", fileSchema);

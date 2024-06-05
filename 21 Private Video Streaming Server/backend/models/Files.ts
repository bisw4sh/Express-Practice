import { model, Schema } from "mongoose";

const File = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  thumbnail: {type: String},
  name: { type: String, required: true },
  identifier: { type: String, required: true },
});

export const Files = model("Files", File);

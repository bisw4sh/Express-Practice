import mongoose, { Schema } from "mongoose";

const User = new Schema(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

export const Users = mongoose.model("Users", User);

// export interface UserDocRet {
//   _id: Schema.Types.ObjectId;
//   id: string;
//   username: string;
//   password: string;
//   role: string;
//   createdAt: Date;
//   updatedAt: Date;
//   __v: number;
// }

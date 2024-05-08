import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
});

export const RefreshTokens = mongoose.model("RefreshTokens", TokenSchema);



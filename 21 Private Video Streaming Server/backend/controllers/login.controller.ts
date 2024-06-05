import bcrypt from "bcrypt";
import "colors";
import { Users } from "../models/Users.js";

export const userExists = async (user: string) => {
  try {
    const user_in_db = await Users.findOne({ username: user });

    if (!user_in_db) throw new Error("No user in db");

    return user_in_db;
  } catch (error) {
    console.log(error.message.cyan);
    return null;
  }
};

export const verifyPassword = async (
  receivedPassword: string,
  hashPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(receivedPassword, hashPassword);
    if (!isMatch) throw new Error("Invalid password");

    return isMatch;
  } catch (error) {
    console.error(error.cyan);
    return false;
  }
};

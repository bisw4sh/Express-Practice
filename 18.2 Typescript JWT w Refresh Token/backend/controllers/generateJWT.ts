import jwt from "jsonwebtoken";
import { get_private_key } from "./get_keys";

export const generate_jwt = async ({
  username,
  role = "normal",
  expiration,
}) => {
  try {
    const private_key = await get_private_key();
    const jwt_string = jwt.sign(
      {
        username,
        role,
        iat: Math.floor(Date.now() / 1000),
        // exp: Math.floor(Date.now() / 1000) + 10,
      },
      private_key,
      {
        algorithm: "RS256",
        expiresIn: `${expiration}s`,
      }
    );

    return jwt_string;
  } catch (error) {
    throw new Error("Error in signing JWT: " + error);
  }
};

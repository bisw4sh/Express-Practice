import jwt from "jsonwebtoken";
// import "dotenv/config";

export const generate_jwt = ({ username, role = "normal" }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  try {
    const jwt_string = jwt.sign(
      {
        username,
        role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.JWT_SECRET
    );

    return jwt_string;
  } catch (error) {
    throw new Error("Error in signing JWT: " + error.message);
  }
};

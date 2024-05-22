import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "./models/Users";
import { userExists, verifyPassword } from "./controllers/login.controller";

export default passport.use(
  new LocalStrategy(
    { usernameField: "user", passwordField: "password" },
    async (username, password, done) => {
      try {
        const checkExistence = await userExists(username);
        if (!checkExistence) {
          return done(null, false, {
            message: "No user with that username",
          });
        }

        const isMatch = await verifyPassword(password, checkExistence.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, checkExistence);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById({ id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

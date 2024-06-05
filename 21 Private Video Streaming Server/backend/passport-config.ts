import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
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
  process.nextTick(function () {
    done(null, { username: user.username, id: user.id, role: user.role });
  });
});

passport.deserializeUser(async (user: Express.User, done) => {
  try {
    process.nextTick(function () {
      return done(null, user);
    });
  } catch (err) {
    done(err);
  }
});

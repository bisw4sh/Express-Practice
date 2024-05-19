import express, { Request, Response, NextFunction } from "express";
import CookieParser from "cookie-parser";
import "dotenv/config";
import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import logoutRoute from "./routes/logout.js";
import dashboardRoute from "./routes/dashboard.js";
import privateRoute from "./routes/private.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import "colors";
import { dbcn } from "./db/connection.js";
import { AppError, errorHandler } from "./middleware/error.js";

type User = string;
declare module "express-session" {
  interface SessionData {
    user: User;
    role: string;
  }

  interface Cookie {
    user: User;
  }
}

declare global {
  namespace Types {
    interface ReturnMsg {
      user?: User | null;
      success?: boolean;
      message?: string;
    }
  }
}

declare global {
  namespace Express {
    interface Response {
      user?: User | null;
      success?: boolean;
      message?: string;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 8080;
app.set("trust proxy", 1); // trust first proxy

dbcn();
app.use(express.json());
app.use(CookieParser("<secret>"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    // name: "identifier", //name of the cookie identifier/name in the client || commented out to make both same in client/server
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      // dbName: "sessions-db",
      collectionName: "sessions-collection",
    }),
    secret: "cbmelion",
    // key: "session_id", //name of the session identifer in server
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60 * 24, // session max age in miliseconds
    },
  })
);

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/private", privateRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(
    `Requested ${req.method} ${req.protocol}://${req.hostname}:${PORT}${req.originalUrl} doesn't exist`,
    404
  );
  console.log(error.message.red);
  return next(error);
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));

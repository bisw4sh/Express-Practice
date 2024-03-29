import express from "express";
import session from "express-session";
import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import logoutRoute from "./routes/logout.js";
import findUserRoute from "./routes/findUser.js";
import privateRoute from "./routes/private.js";
import MongoStore from "connect-mongo";
import CookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;
app.set("trust proxy", 1); // trust first proxy

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
    secret: "<secret>",
    key: "session_id", //name of the session identifer in server
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60 * 24, // session max age in miliseconds
    },
  })
);

app.get("/", (_, res) => {
  res.send("It is working");
});

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/find", findUserRoute);
app.use("/api/private", privateRoute);

app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));

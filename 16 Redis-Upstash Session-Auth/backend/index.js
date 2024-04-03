import express from "express";
import session from "express-session";
import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import logoutRoute from "./routes/logout.js";
import findUserRoute from "./routes/findUser.js";
import privateRoute from "./routes/private.js";
import CookieParser from "cookie-parser";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const app = express();
const PORT = process.env.PORT || 8080;
app.set("trust proxy", 1); // trust first proxy

const redisClient = createClient({
  url: `rediss://default:${process.env.REDIS_PASSWORD}@${process.env.ENDPOINT}:34372`,
});

// Initialize client.
redisClient.on("error", function (err) {
  console.log("It was from this block, where error occurred: " + err.message);
  throw err;
});
await redisClient.connect();

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sessions:",
});

app.use(express.json());
app.use(CookieParser("<secret>"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    // name: "identifier", //name of the cookie identifier/name in the client || commented out to make both same in client/server
    store: redisStore,
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

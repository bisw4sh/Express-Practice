import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import logoutRoute from "./routes/register.js";
import active_sessions from "./middleware/active_sessions.js";
import req_ping from "./controllers/req_ping.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "<secret>",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(req_ping);

app.get("/", (req, res) => {
  res.send("It is working");
});

app.use("/api/login", active_sessions, loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/logout", logoutRoute);

app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));

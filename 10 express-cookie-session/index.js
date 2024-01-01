import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cookieRoutes from "./routes/cookie.js";
import sessionRoutes from "./routes/session.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "index page",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secureProxy: true,
      // httpOnly: true,
      // domain: "example.com",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })
);

app.use("/cookie", cookieRoutes);
app.use("/session", sessionRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "This is HomePage" });
});

app.listen(8000, () => console.log("running @ http://localhost:8000"));

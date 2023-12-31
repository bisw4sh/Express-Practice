import express from "express";
import session from "express-session";
import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "<secret>",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.get("/", (req, res) => {
  res.send("It is working");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));

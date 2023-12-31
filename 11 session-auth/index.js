import express from "express";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    // store: store,
  })
);

app.get("/", (req, res) => {
  res.send("It is working");
});

app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));

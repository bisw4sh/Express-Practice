import express from "express";
import CookieParser from "cookie-parser";
import "dotenv/config";
import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import logoutRoute from "./routes/logout.js";
import findUserRoute from "./routes/dashboard.js";
import privateRoute from "./routes/private.js";
import { dbcn } from "./db/connection.js";
import verification from "./middleware/jwt_verification.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.set("trust proxy", 1); // trust first proxy

dbcn();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser(process.env.COOKIE_SIG));

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/dashboard", findUserRoute);
app.use("/api/private", verification, privateRoute);

app.listen(PORT, () => console.log(`Running @ http://localhost:${PORT}`));

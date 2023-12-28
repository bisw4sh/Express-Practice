import express from "express";
import userRoutes from "./route/user.js";

const app = express();
app.use(express.json());
app.use("/", userRoutes);

app.listen(8080, () => console.log(`Running @ http://localhost:${8080}`));

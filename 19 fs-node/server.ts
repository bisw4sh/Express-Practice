import express, { Request, Response } from "express";
import { url_read } from "./controllers/using_url";
import read_routes from "./routes/read.routes";
import append_routes from "./routes/append.routes";
import write_routes from "./routes/write.routes";
import rename_routes from "./routes/rename.routes";
import delete_routes from "./routes/delete.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_: Request, res: Response) => {
  const data = await url_read();
  res.send(data);
});

app.use("/read", read_routes);
app.use("/append", append_routes);
app.use("/write", write_routes);
app.use("/rename", rename_routes);
app.use("/delete", delete_routes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

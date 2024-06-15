import express, { Request, Response } from "express";
import "dotenv/config";
import { run } from "./config/gemini-config";

// Create Express App
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example Route
app.get("/api/quiz/:fileName", async (req: Request, res: Response) => {
  const { fileName } = req.params;
  const return_text = await run(fileName);
  res.json(return_text);
});

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

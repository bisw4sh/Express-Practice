import express, { Request, Response } from "express";

// Create Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example Route
app.get("/", (req: Request, res: Response) => {
  res.send("Express server is now running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

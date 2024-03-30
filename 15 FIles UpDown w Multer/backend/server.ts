import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { fileInfo } from "./models/files";
import { dbcn } from "./connection";
import "dotenv/config";

// Create Express App
const app = express();
const PORT = 3000;

//Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.static(path.join(process.cwd(), "uploads")));
try {
  //Database connection
  dbcn();
} catch (error) {
  console.log("Error in db connection");
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example Route
app.get("/", async (req: Request, res: Response) => {
  res.send("Express server is now running");
});

app.post(
  "/api/submission",
  upload.single("pfp_file"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      // console.log(req.body?.pfp_file); //can't access this way
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
      console.log(req.file);

      await fileInfo.create({
        fileName: req.file.filename,
        path: `./uploads/${req.file.filename}`,
      });

      res.send("It was well received!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error in processing");
    }
  }
);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

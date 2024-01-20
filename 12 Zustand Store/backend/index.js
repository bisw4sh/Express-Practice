import express from "express";
import { products } from "./data/products.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(8080, () => console.log(`Server runnning @ http://localhost:8080`));

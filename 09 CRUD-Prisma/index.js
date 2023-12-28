import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Get all Users
app.get("/", async (req, res) => {
  try {
    const getUsers = await prisma.user.findMany();
    res.json(getUsers);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Get a user with ID provided
app.get("/:id", async (req, res) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(getUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Create a user
app.post("/", async (req, res) => {
  try {
    const insertUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name || "Not Provided",
        age: req.body.age,
      },
    });
    res.json(insertUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        email:
          req.body.email !== undefined ? req.body.email : existingUser.email,
        name: req.body.name !== undefined ? req.body.name : existingUser.name,
        age:
          req.body.age !== undefined
            ? parseInt(req.body.age)
            : existingUser.age,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8080, () => console.log(`Listening @ localhost:${8080}`));

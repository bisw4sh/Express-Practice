import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const getUsers = await prisma.user.findMany();
    res.json(getUsers);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getUser = async (req, res) => {
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
};

export const createUser = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

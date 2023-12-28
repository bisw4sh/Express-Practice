import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/", updateUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;

import express from "express";
import users from "../controllers/users.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { user, password } = req.body;
  users.push({ user, password });
  console.log(users);
  res.send({ user, password });
});

export default router;

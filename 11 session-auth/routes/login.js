import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { user, password } = req.body;
  res.send({ user, password });
});

export default router;

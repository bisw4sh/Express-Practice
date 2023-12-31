import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.cookies);
  console.log(res.session.data);
  req.session.destroy();
  res.cookie.clear;
  res.send(`Cookie has been destroyed`);
});

export default router;

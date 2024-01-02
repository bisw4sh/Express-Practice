import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.cookies);
  console.log(res.session.data);
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Session is destroyed");
    }
  });
  res.cookie.clear;
  res.clearCookie("data");
  res.send(`Cookie has been destroyed`);
});

export default router;

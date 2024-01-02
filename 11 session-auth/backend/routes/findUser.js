import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.cookies["connect.sid"] === req.sessionID) {
    console.log(req.session.data);
    res.send(req.session.data);
  } else {
    res.send('nth')
  }
});

export default router;

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.data === "biswash") {
    res.send(`The private data is only being sent to ${req.session.data}`);
  } else {
    res.send(`redirect`);
  }
});

export default router;

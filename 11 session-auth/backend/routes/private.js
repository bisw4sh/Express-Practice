import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("it was here ");

  if (req.session.data === "biswash") {
    res.send(`The private data is only being sent to ${req.session.data}`);
    console.log("Yeha biswash matra milxa hai");
  } else {
    res.send("yesto tah garna bhayena ni");
  }
});

export default router;

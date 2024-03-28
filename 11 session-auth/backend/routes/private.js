import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {

  console.log("it was here ");
  
  if (req.session.data === "biswash") {
    res.send(`The private data is only being sent ot ${req.session.data}`);
    console.log("Yeha biswash matra milxa hai");
  } 
  else {
    console.log("yeha aaayo bhane chai redirect");
    res.redirect("/");
  }
  
});

export default router;

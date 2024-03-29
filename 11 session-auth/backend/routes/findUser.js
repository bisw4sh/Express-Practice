import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("--------------------------------------------");
    // console.table(req.session);
    // console.log(req.session["data"]); //undefined
    // console.log(req.cookies); //undefined
    // console.log(req.cookies["session_id"]); //undefined
    // console.log(`Session Data : ${req.session["data"]}`); //undefined
    console.log(`Session ID : ${req.sessionID}`); //this shows
    console.log("--------------------------------------------");
    // let retVal = req.session["data"] ? req.session["data"] : "anon";
    res.send(req.session?.data);
  } catch (error) {
    console.log("There must have been an error here");
    res.status(500).send(error);
  }
});

export default router;

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("--------------------------------------------");
    console.table(req?.session);
    console.log(req.session?.data);
    console.log(req?.cookies); //undefined
    console.log(req?.cookies?.session_id); //undefined
    console.log(`Session ID : ${req.sessionID}`);
    console.log("--------------------------------------------");
    res.send(req.session?.data);
  } catch (error) {
    console.log("There must have been an error here");
    res.status(500).send(error);
  }
});

export default router;

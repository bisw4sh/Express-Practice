import express from "express";
// import cookieParser from "cookie-parser";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    console.log("--------------------------------------------");
    console.table(req.session);
    console.table(req.session['data']);
    console.log(req.cookies);
    console.log(`Session Data : ${req.session['data']}`);
    console.log(`Session ID : ${req.sessionID}`);
    console.log("--------------------------------------------");

    res.send(req.session.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

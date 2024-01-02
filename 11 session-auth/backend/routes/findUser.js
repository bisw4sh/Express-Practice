import express from "express";
import cookieParser from "cookie-parser";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("--------------------------------------------");

  console.table(req.session);
  console.table(req.cookies);
  console.log(`Session Data : ${req.session?.data}`);
  console.log(`Cookie Data : ${req.cookies.data?.user}`);

  console.log(`Session ID : ${req.sessionID}`);
  console.log(
    `Cookie ID ${cookieParser.signedCookie(req.cookies.session_id, "<secret>")}`
  );
  console.log("--------------------------------------------");

  res.send(await req.session.data);
});

export default router;

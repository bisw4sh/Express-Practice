import express from "express";
import {
  setCookie,
  checkCookie,
  changeCookie,
  destroyCookie,
} from "../controller/cookie.js";
const router = express.Router();

router.get("/set/:name", setCookie);
router.get("/check", checkCookie);
router.get("/change", changeCookie);
router.get("/destroy", destroyCookie);

export default router;

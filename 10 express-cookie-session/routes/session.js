import express from "express";
import {
  setSession,
  checkSession,
  changeSession,
  destroySession,
} from "../controller/session.js";
const router = express.Router();

router.get("/set", setSession);
router.get("/check", checkSession);
router.get("/change", changeSession);
router.get("/destroy", destroySession);

export default router;

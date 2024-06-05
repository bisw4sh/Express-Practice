import { Router } from "express";
import {uploadHandler} from "../controllers/upload.controller"

const router = Router();

router.post('/', uploadHandler)

export default router;

import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { deletion } from "../controllers/deletion.controller";
const router = Router();

router.delete("/:identifier", asyncErrorHandler(deletion));

export default router;

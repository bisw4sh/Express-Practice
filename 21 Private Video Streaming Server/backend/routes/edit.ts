import { Router } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { handleEdit } from "../controllers/edit.controller";

const router = Router();

router.patch("/", asyncErrorHandler(handleEdit));

export default router;

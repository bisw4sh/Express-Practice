import express from 'express';
import { getAllTODO, addTODO, updateTODO, deleteTODO, getATODO } from "../controllers/controls.js";

const router = express.Router();

router.get('/', getAllTODO)
router.post('/', addTODO)
router.patch('/:id', updateTODO)
router.delete('/:id', deleteTODO)
router.get('/:id', getATODO)

export default router;
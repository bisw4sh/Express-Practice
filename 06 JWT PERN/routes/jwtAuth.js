import express from 'express';
import { register, login, Verify } from '../controllers/control.js';
import validInfo from '../middleware/validinfo.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.post('/register',validInfo, register)
router.post('/login',validInfo, login)
router.get("/verify", authorization, Verify);

export default router;
import express from 'express';
import { getallUsers, addUser, getUserById, getUserByIndex, deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get('/', getallUsers)
router.post('/', addUser)
router.get('/ids/:id', getUserById)
router.get('/:index', getUserByIndex)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser);

export default router;
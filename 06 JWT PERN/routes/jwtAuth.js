import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {name, email , password} = req.body;

        const userExist = await pool.query( 'SELECT * FROM users WHERE user_email = $1;', [email])

        res.json(userExist.rows);
        
    } catch (error) {
        console.log(error.message);
    }

})

export default router;
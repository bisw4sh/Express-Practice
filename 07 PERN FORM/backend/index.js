import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import { pool } from './db.js';
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api', async (req, res) => {
    try {
        const { name, email, age, gender, framework} = req.body
        const id = uuidv4()
        const fav_lib = Object.keys(framework).filter(key => framework[key] === true);
        console.log(id, name, email, age, gender, fav_lib[0])

        const putInto = await pool.query('INSERT INTO users(id, full_name, email, age, gender, framework) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
        [id, name, email, age, gender, fav_lib[0]])

        res.json(putInto.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import auth from "./routes/jwtAuth.js"
import dashboard from "./routes/dashboard.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', auth)
app.use('/dashboard', dashboard)

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
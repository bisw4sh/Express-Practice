import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import auth from "./routes/jwtAuth.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', auth)


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
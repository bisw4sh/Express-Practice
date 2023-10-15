import express from 'express';
import cors from 'cors';
import auth from "./routes/jwtAuth.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', auth)


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(8000, () => console.log('http://localhost:8000'))
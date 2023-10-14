import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/',routes)

app.listen(3000, () => console.log('http://localhost:3000 \nBetter open API testing tool like postman, insomnia or of your preference'))
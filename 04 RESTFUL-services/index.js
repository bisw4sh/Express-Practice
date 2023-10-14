import express from 'express';
import userRoutes from './routes/users.js';

const app = express();
app.use(express.json());

//Routes middleware
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Homepage")
});


app.listen(3000, () => console.log("http://localhost:3000"))
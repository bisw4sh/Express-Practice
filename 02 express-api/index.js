const express = require('express');
const app = express();

app.use(express.json());

console.log("http://localhost:3000/")
let globalARR = [];

app.use((req, res, next) => {
    console.log("Ran middleware")
    next()
})

app.get('/', (req,res) => {
console.log("GET REQUEST")
res.send(globalARR)
})

app.get('/:index', (req,res) => {
    res.send(globalARR[req.params.index])
})

app.post('/', (req,res) => {
    console.log("POST REQUEST was invoked")
    globalARR.push(req.body)
    res.send(globalARR)
})

app.delete('/', (req,res) => {
    globalARR.pop()
    res.send(globalARR)
})


app.listen(3000)
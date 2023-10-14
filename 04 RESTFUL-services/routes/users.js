import express from 'express';
import user from "../user.json" assert {type: 'json'};
import { v4 as uuidv4 } from 'uuid';
let usersArr = [...user]

const router = express.Router();

router.get('/', function(req, res){
    res.send(usersArr)
})

router.post('/', function(req, res){
    const user = req.body
    const userwithId = {...user, id: uuidv4()}
    usersArr.push(userwithId)
    res.send(userwithId)
})

router.get('/:id', function(req, res){
    if(parseInt(req.params.id) >= usersArr.length) return res.status(400).send("Enter valid index");
    res.send(usersArr[req.params.id])
})

export default router;
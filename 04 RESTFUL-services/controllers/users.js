import { v4 as uuidv4 } from 'uuid';
import user from "../user.json" assert {type: 'json'};

let usersArr = [...user]

export const getallUsers = (req, res) => res.send(usersArr)

export const addUser = (req, res) => {
    const user = req.body
    const userwithId = {...user, id: uuidv4()}
    usersArr.push(userwithId)
    res.send(userwithId)
}

export const getUserById = (req, res) => {
    const user = usersArr.find((user) => user.id === req.params.id);
    res.send(user)
}

export const getUserByIndex = (req, res) => {
    if(parseInt(req.params.index) >= usersArr.length) return res.status(400).send("Enter valid index");
    res.send(usersArr[req.params.index])
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    usersArr = usersArr.filter( user => user.id !== id)
    res.send(usersArr)
}

export const updateUser = (req, res) => {
    const user = usersArr.find((user) => user.id === req.params.id);

    if(req.body.firstName) user.firstName = req.body.firstName;
    if(req.body.lastName) user.lastName = req.body.lastName;
    if(req.body.age) user.age = req.body.age;

    res.send(`ID : ${req.params.id} \nName: ${user.firstName} ${user.lastName} \nAge: ${user.age}`)
}
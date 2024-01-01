import express from "express";
import users from "../controllers/users.js";

const router = express.Router();

router.post("/", (req, res) => {
  const [_user, _password] = [req.body.user, req.body.password];

  const ifUserExists = users.some(({ user }) => user === _user);
  if (ifUserExists) {
    console.log(`${_user} <- username already exists`);
  } else {
    users.push({ _user, _password });
    console.log(`${_user} <- username added to db`);
  }
  res.send({ _user, _password });
});

export default router;

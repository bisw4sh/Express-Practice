import express from "express";
import users from "../controllers/users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const [_user, _password] = [req.body.user, req.body.password];

  const ifUserExists = users.some(({ user }) => user === _user);

  if (ifUserExists) {
    const isMatch = users.filter(
      ({ user, password }) => user === _user && password === _password
    );
    console.log(isMatch);
    if (_password === isMatch[0].password) {
      req.session.data = _user;
      res.cookie("data", { user: _user });
      console.log(req.sessionID);
      res.status(200).send(`Logged In, cookies saved`);
    } else {
      res.status(401).send(`Invalid password for ${_user}`);
    }
  } else {
    res.status(401).send(`${_user} doesn't exist`);
  }
});

export default router;

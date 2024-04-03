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

    if (_password === isMatch[0]?.password) {
      req.session.data = _user;
      res.status(200).send("success");
    } else {
      res.status(401).send("error");
    }
  } else {
    res.status(401).send("error");
  }
});

export default router;

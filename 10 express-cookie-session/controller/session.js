import { v4 as uuidv4 } from "uuid";

export const setSession = async (req, res) => {
  req.session.setting = { token: uuidv4() };
  console.log(req.session.setting);
  res.send("<h1>Session has been set. Look at server console</h1>");
};

export const checkSession = async (req, res) => {
  console.log(req.session.setting);
  res.send("<h1>Check session @. Look at server Console</h1>");
};

export const changeSession = async (req, res) => {
  req.session.setting = { token: "token has been changed" };
  console.log(req.session.setting);
  res.send("<h1>Token Changed. Look at server console</h1>");
};

export const destroySession = async (req, res) => {
  req.session.destroy();
  console.log(req.session?.setting || "NO session");
  res.send(
    "<h1>Session and Token has been destroyed. Look at server Console</h1>"
  );
};

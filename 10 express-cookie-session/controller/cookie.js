import { v4 as uuidv4 } from "uuid";

export const setCookie = async (req, res) => {
  if (req.cookies.data) {
    res.send("Cookie already exists");
  } else {
    res.cookie("data", { token: uuidv4(), user: req.params.name });
    res.send("<h1>Cookie has been set</h1>");
  }
};

export const checkCookie = async (req, res) => {
  const { data } = req.cookies;
  console.log(data === "" ? "there was no cookie" : data);
  res.send("<h1>Check Server console to check the cookie</h1>");
};

export const changeCookie = async (req, res) => {
  const newCookie = res.cookie("data", { token: uuidv4(), user : req.cookies.data?.name });
  console.log(newCookie);
  res.send("<h1>Token Changed. Look at server console</h1>");
};

export const destroyCookie = async (req, res) => {
  res.cookie.clear;
  console.log(res.cookie?.data || "No Cookie");
  res.send(
    "<h1>Cookie and Token has been destroyed. Look at server Console</h1>"
  );
};

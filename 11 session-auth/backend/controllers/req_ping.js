const req_ping = async (req, res, next) => {
  if (req.cookies["connect.sid"]) {
    console.log(req.cookies["connect.sid"]);
  } else {
    console.log(`Has no cookie`);
  }
  next();
};

export default req_ping;

const req_ping = async (req, res, next) => {
  if (req.cookies.length > 0) {
    console.log(req.cookie["data"]);
  } else {
    console.log(`Has no cookie`);
  }
  next();
};

export default req_ping;

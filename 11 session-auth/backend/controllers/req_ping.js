const req_ping = async (req, res) => {
  if (req.cookies["connect.sid"]) {
    console.log(req.cookies["connect.sid"]);
  } else {
    console.log(`Has no cookie`);
  }
};

export default req_ping;

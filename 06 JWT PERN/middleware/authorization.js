import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authorization = async (req, res, next) => {
    // Get token from header
    const jwtToken = req.header("jwtToken");
  
    // Check if not token
    if (!jwtToken) {
      return res.status(403).json({ msg: "authorization denied" });
    }
  
    // Verify token
    try {
      //it is going to give use the user id (user:{id: user.id})
      const verify = jwt.verify(jwtToken, process.env.jwtSecret);
  
      req.user = verify.user;
      console.log(req.user);
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
      console.log(err.message);
    }
} 

export default authorization;
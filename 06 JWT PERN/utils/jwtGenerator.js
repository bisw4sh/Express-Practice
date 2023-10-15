import jwt from 'jsonwebtoken';
import 'dotenv/config'

const jwtGenerator = (user_id) => {
    const payload = { user: user_id };
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

export default jwtGenerator;
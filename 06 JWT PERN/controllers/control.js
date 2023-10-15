import jwtGenerator  from '../utils/jwtGenerator.js';
import pool from '../db.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const {name, email , password} = req.body;

        const userExist = await pool.query( 'SELECT * FROM users WHERE user_email = $1;', [email])

        if( userExist.rows.length > 0 ) return res.status(401).send("User already exists")

        const saltRound = 10;
        const salt = await  bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword)

        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [
            name, email, bcryptPassword]);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ jwtToken });        
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE user_email=$1', [email])

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
          }
    
          const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
          );

          if (!validPassword) {
            return res.status(401).json("Invalid Credential");
          }
          const jwtToken = jwtGenerator(user.rows[0].user_id);
          return res.json({ jwtToken });
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
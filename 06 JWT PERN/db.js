import pg from 'pg';
const Pool = pg.Pool;

const pool  = new Pool({
    user: "postgres",
    password: "Duck#3ill",
    host: "localhost",
    port : 5432,
    database: "auth"
})

export default pool;
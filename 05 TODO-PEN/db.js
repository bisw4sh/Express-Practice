import pg from 'pg';
const Pool = pg.Pool;

export const pool = new Pool({
  user: "postgres",
  password: "Duck#3ill",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});
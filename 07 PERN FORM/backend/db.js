import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres",
    password: "Duck#3ill",
    host : "localhost",
    port: 5432,
    database: "formHandle"
})
import pkg from 'pg'
const { Client } = pkg

//Above code should be as it is; quite idiotic

const client = new Client(
    {
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "<your_password>",
        database: "practice"
    }
)
await client.connect()
 
try {
   const res = await client.query('select * from data where gpa = 3.9;')
   console.log(res.rows)
} catch (err) {
   console.error(err);
} finally {
   await client.end()
}
// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new pg.Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// // TEST CONNECTION
// pool.query("SELECT NOW()")
//   .then(res => {
//     console.log("Connected to PostgreSQL at:", res.rows[0].now);

//   })
//   .catch(err => {
//     console.error("DB CONNECTION ERROR:", err);
//   });

// export default pool;

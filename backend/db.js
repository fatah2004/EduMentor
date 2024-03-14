// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'edumentor',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
console.log(pool)
module.exports = pool;

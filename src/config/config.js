const mysql = require("mysql2/promise");

const connection =  mysql.createPool({
  host: "localhost",
  user: "root",
  password: "M1racle@123",
  database: "spring"
});


module.exports = connection;

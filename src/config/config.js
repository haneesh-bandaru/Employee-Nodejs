const mysql = require("mysql2/promise");

const connection =  mysql.createPool({
  host: "localhost",
  user: "root",
  password: "haneesh",
  database: "spring"
});


module.exports = connection;

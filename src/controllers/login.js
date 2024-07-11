const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/config");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const sql = `select count(*) as count,role_id from Employee where username = '${username}' and emp_pass = '${password}'`;
    const [rows, field] = await connection.query(sql);
    console.log(rows)
    //throw 401
    if (rows[0].count != 1) {
      res.status(500).send("User Not found");
      return false;
    }
    const roleSql = `select role_name from Role where role_id = ${rows[0].role_id}`;
    const [roleRow, roleField] = await connection.query(roleSql);
    //token generation
    const token = jwt.sign({ userId: username, role: roleRow[0].role_name }, "1234", {
      expiresIn: "1h"
    });
    res.cookie("token", token);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

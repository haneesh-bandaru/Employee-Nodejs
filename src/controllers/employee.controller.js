// employee.controller.js
const { userNameGenerator, passwordGenerator } = require("../util/functions");
const connection = require("../config/config");
require("dotenv").config();

//get list of employees
const getEmp = async (req, res) => {
  const sql = "SELECT * FROM Employee";
  try {
    const [rows, fields] = await connection.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Insert Employee
async function insertEmp(req, res) {
  let {
    authId,
    authPass,
    firstName,
    lastName,
    department,
    phonenumber,
    personalMail,
    location,
    pincode,
    salary,

    roleId,
  } = req.body;
  let addedBy = req.username;
  const username = await userNameGenerator(firstName, lastName);
  const password = passwordGenerator(firstName, lastName);
  var date = new Date();
  date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  const email = `${username}@miraclesoft.com`;
  const sql = `insert into Employee (first_name,last_name,emp_dept,phone,joining_date,gmail_id,w_mail,emp_pass,location,pincode,salary,username,added_by,role_id) values('${firstName}','${lastName}','${department}',${phonenumber},'${date}','${personalMail}','${email}','${password}','${location}',${pincode},${salary},'${username}','${addedBy}',${roleId})`;
  const [result, fields] = await connection.query(sql);
  res.status(200).send("inserted");
}

// Delete Employee
async function deleteEmp(req, res) {
  const empId = req.params.id;
  const sql = `delete from Employee where emp_id = ${empId}`;
  const [result, fields] = await connection.query(sql);
  res.status(200).json({ message: "deleted" });
}

module.exports = { getEmp, insertEmp, deleteEmp };

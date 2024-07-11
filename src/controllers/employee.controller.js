// employee.controller.js
const { userNameGenerator, passwordGenerator } = require("../util/functions");
const moment = require("moment");
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
    firstName,
    lastName,
    department,
    phonenumber,
    personalMail,
    location,
    pincode,
    salary,

    roleId
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

//Fetch Employee
async function getEmployee(req, res) {
  const username = req.params.username;
  const sql = `select * from Employee where username = '${username}'`;
  const [result, fields] = await connection.query(sql);
  res.status(200).json(result);
}

//Get Task
async function getTask(req, res) {
  try {
    const sqlTasks = `SELECT * FROM Task WHERE assigned_to = ?`;
    const sqlCount = `SELECT COUNT(*) as task_count FROM Task WHERE assigned_to = ?`;

    const [tasks] = await connection.query(sqlTasks, [req.params.emp_id]);
    const [count] = await connection.query(sqlCount, [req.params.emp_id]);

    res.status(200).json({ tasks, count: count[0].task_count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
}

//insert Task
async function insertTask(req, res) {
  try {
    let { taskName, taskCreatedBy, assignedTo, duration, taskStartDate, status, description } =
      req.body;

    // Example: Check if taskStartDate is valid
    if (!moment(taskStartDate, "YYYY-MM-DD", true).isValid()) {
      throw new Error("Invalid task start date format. Please use YYYY-MM-DD");
    }

    // Calculate end date based on duration and start date
    const startDate = moment(taskStartDate);
    const endDate = startDate
      .clone()
      .add(Math.ceil(duration / 8), "days")
      .format("YYYY-MM-DD");

    // Insert Task
    const sql = `INSERT INTO Task (task_name, task_created_by, assigned_to, task_create_date, duration, task_start_date, task_end_date, status, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(sql, [
      taskName,
      taskCreatedBy,
      assignedTo,
      moment().format("YYYY-MM-DD"),
      duration,
      taskStartDate,
      endDate,
      status,
      description
    ]);

    res.status(200).send("Task added successfully.");
  } catch (error) {
    console.error("Error adding task:", error.message);
    res.status(500).send(`Error adding task: ${error.message}`);
  }
}


module.exports = { getEmp, insertEmp, deleteEmp, getEmployee, getTask, insertTask };

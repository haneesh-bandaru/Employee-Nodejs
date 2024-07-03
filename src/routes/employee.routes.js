// routes.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.get("/get-employees", employeeController.getEmp);
router.post("/insert-employee", employeeController.insertEmp);

module.exports = router;

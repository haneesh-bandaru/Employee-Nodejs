// routes.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.get("/get-employees", employeeController.getEmp);
router.get("/get-emp/:username", employeeController.getEmployee);
router.get("/get-task/:emp_id", employeeController.getTask);


router.post("/insert-employee", employeeController.insertEmp);
router.post("/insert-task", employeeController.insertTask);


router.delete("/delete-employee/:id", employeeController.deleteEmp);

module.exports = router;

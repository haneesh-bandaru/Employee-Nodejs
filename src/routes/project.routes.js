// project.routes.js
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects.controller");

//this helps in getting all the projects
router.get("/get-projects", projectController.getProjects);

module.exports = router;

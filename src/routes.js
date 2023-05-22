const express = require("express");
// import userCtrl from './controllers/Users.controller.js';

// import auth from "../src/auth/middleware"
/*
	File cointaining all routes to the controllers of the platform
	*/

var router = express.Router();

const UserController = require("./controllers/User.controller");

router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);

const {
  getAllClass,
  createClass,
  getOneClass,
  updateClass,
  deleteClass,
} = require("./controllers/Class.controller");

router.get("/class/:id", getAllClass);
router.get("/class/one/:id", getOneClass);
router.post("/class/:id", createClass);
router.put("/class/:id", updateClass);
router.delete("/class/:id", deleteClass);

const {
  getAllStudent,
  createStudent,
  getOneStudent,
  updateStudent,
  deleteStudent,
} = require("./controllers/Student.controller");

router.get("/student/:id", getAllStudent);
router.get("/student/one/:id", getOneStudent);
router.post("/student/:id", createStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;

const express = require("express");
const router = express.Router();
const bookCourseController = require("../Controller/bookCourseController");
const verifyJWT = require("../middleware/authMiddleware");

router.post("/create", verifyJWT, bookCourseController.createBookCourse);

module.exports = router;

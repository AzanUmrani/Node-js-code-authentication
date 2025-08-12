const express = require("express");
const router = express.Router();
const bookCourseController = require("../Controller/bookCourseController");
const verifyJWT = require("../middleware/authMiddleware");

router.post("/create", verifyJWT, bookCourseController.createBookCourse);
router.get('/instructor/:instructor_id/bookings', verifyJWT, bookCourseController.getInstructorBookings);

module.exports = router;

const authController = require('../Controller/authController');
const VerifyJWTtoken = require('../Middleware/authMiddleware.js')

const router = require("express").Router();

router.post("/Register" , authController.register);
router.post("/login" , authController.login)


module.exports = router;
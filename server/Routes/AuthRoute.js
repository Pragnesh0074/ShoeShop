const { Signup, Login, Logout, AdminLogin } = require("../Controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/", userVerification)
router.post("/signup", Signup)
router.post("/login", Login)
router.post("/logout", Logout)
router.post("/adminLogin", AdminLogin)

module.exports = router;
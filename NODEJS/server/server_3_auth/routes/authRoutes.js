const express = require("express");
const router = express.Router()

const {signup, login} = require("./../controllers/authController")

// http://localhost:3000/api/auth
router.post("/signup", signup)
router.post("/login", login)

module.exports = router

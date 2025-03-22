const express = require("express");
const { login, register ,getUserInfo} = require("../Controller/AuthController");
const authenticate = require("../Middleware/isAuth");

const router = express.Router();


  

router.post("/login",login);       // POST /auth/login
router.post("/register", register); // POST /auth/register
router.get("/me", authenticate, getUserInfo); // ✅ Fix: Use authenticate middleware

module.exports = router;

const express = require("express");
const { fetchUsers, addUser } = require("../Controller/UserController");

const router = express.Router();

router.get("/", fetchUsers); // GET /users
router.post("/", addUser);   // POST /users

module.exports = router;

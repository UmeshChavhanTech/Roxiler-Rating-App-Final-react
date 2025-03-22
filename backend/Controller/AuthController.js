const { findUserByEmailAndPassword, createUser,findUserById } = require("../models/UserModel");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  console.log("Request Body:", req.body); // Debugging log
  const { email, password, role } = req.body;

  try {
    const user = await findUserByEmailAndPassword(email, password); // Pass email and password explicitly
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (role !== "normal" && user.urole !== role) {
      return res.status(403).json({ error: "Unauthorized role" });
    }
       // ✅ Generate JWT Token
       const userpayload={ uid: user.uid, role: user.urole };
       const secretKey = "omkarabhang36";

       const token = jwt.sign(userpayload, secretKey, { expiresIn: "1h" });

       res.json({ token, user }); // ✅ Send token with user details

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  const { name, email, password, role, address } = req.body;
  try {
    const newUser = await createUser(name, email, password, role, address);
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ New function to fetch logged-in user information
const getUserInfo = async (req, res) => {
  try {
    const user = await findUserById(req.user.uid); // ✅ FIXED: Use correct field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ userid: user.uid, name: user.uname, email: user.uemail }); // ✅ FIXED
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { login, register ,getUserInfo};

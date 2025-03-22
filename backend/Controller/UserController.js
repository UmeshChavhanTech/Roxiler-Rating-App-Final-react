const { findUserByEmailAndPassword, createUser } = require("../models/UserModel");

const fetchUsers = async (req, res) => {
  const { email, password ,role} = req.body;
  try {
    const users = await findUserByEmailAndPassword(email, password,role);
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const addUser = async (req, res) => {
  const { name, email, password, role, address } = req.body;
  try {
    const newUser = await createUser(name, email, password, role, address);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};


const getNormalUsers = async (req, res) => {
  try {
    const users = await User.find({ urole: "normal" }).select("uname uemail");
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { fetchUsers, addUser,getNormalUsers };

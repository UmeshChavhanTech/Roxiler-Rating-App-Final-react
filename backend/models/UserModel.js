const pool = require("../Utils/DB");

const findUserByEmailAndPassword = async (email, password) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE Uemail = $1 AND Upassword = $2",
      [email, password]
    );
    return result.rows[0]; // Return the user if found
  } catch (err) {
    throw new Error(err.message);
  }
};

const createUser = async (name, email, password, role, address) => {
  const result = await pool.query(
    "INSERT INTO users (Uname, Uemail, Upassword, Urole, Uaddress) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, password, role, address]
  );
  return result.rows[0];
};

const getUserByIdAndRole = async (userId, role) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE Uid = $1 AND Urole = $2",
    [userId, role]
  );
  return result.rows[0]; // Return the user if found, or null otherwise
};


// ✅ New function to get user by ID
const findUserById = async (id) => {
  const result = await pool.query("SELECT uid, uname, uemail FROM users WHERE uid = $1", [id]); 
  return result.rows[0];
};

module.exports = { getUserByIdAndRole,findUserByEmailAndPassword, createUser,findUserById };


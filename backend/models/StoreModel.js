const pool = require("../Utils/DB");

// Fetch all stores
const getAllStores = async () => {
  const result = await pool.query("SELECT * FROM stores");
  return result.rows;
};

// Fetch a store by its ID
const getStoreById = async (storeId) => {
  const result = await pool.query("SELECT * FROM stores WHERE Sid = $1", [
    storeId,
  ]);
  return result.rows[0];
};

// Create a new store
const createStore = async (name, email, address, rating, storeowner_id) => {
    try {
      console.log("Creating Store With:", { name, email, address, rating, storeowner_id }); // Debugging log
  
      const result = await pool.query(
        "INSERT INTO stores (Sname, Semail, Saddress, Srating, storeowner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, address, rating, storeowner_id]
      );
      console.log("Store Insert Result:", result.rows); // Debugging log
  
      return result.rows[0];
    } catch (error) {
      console.error("Error in createStore Query:", error); // Log the actual query error
      throw error; // Bubble the error up
    }
  };

module.exports = { getAllStores, getStoreById, createStore };

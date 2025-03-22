const pool = require("../Utils/DB");

// Insert a rating into the `rating` table
const addRating = async (userid, storeid, rating) => {
    try {
      console.log("Inserting Rating:", { userid, storeid, rating }); // Debugging log
      const result = await pool.query(
        "INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) RETURNING *",
        [userid, storeid, rating]
      );
      console.log("Insert Result:", result.rows); // Debugging log
      return result.rows[0];
    } catch (error) {
      console.error("Error in addRating:", error); // Log database errors
      throw error; // Propagate the error
    }
  };
  

// Retrieve all ratings for a specific store
const getRatingsByStoreId = async (storeid) => {
    try {
      console.log("Fetching Ratings for Store ID:", storeid); // Debugging log
      const result = await pool.query(
        "SELECT * FROM ratings WHERE store_id = $1", // Updated store_id to match column name
        [storeid]
      );
      console.log("Query Result:", result.rows); // Debugging log
      return result.rows;
    } catch (error) {
      console.error("Error in getRatingsByStoreId Query:", error); // Debugging log
      throw error;
    }
  };
  

// Update the average rating in the `stores` table
const updateStoreRating = async (storeid) => {
    try {
      console.log("Updating Store Rating for Store ID:", storeid); // Debugging log
  
      const result = await pool.query(
        "SELECT AVG(rating) AS avg_rating FROM ratings WHERE store_id = $1",
        [storeid]
      );
      let avgRating = result.rows[0]?.avg_rating;
  
      // Ensure avgRating is a number
      avgRating = avgRating ? parseFloat(avgRating) : 0; // Convert to float or default to 0
      console.log("Calculated Average Rating:", avgRating); // Debugging log
  
      // Update the `Srating` field in the `stores` table
      await pool.query("UPDATE stores SET Srating = $1 WHERE Sid = $2", [
        avgRating.toFixed(2), // Round to 2 decimal places
        storeid,
      ]);
    } catch (error) {
      console.error("Error updating store rating:", error); // Log errors
      throw error; // Propagate the error
    }
  };
  

module.exports = { addRating, getRatingsByStoreId, updateStoreRating };

const {
    addRating,
    getRatingsByStoreId,
    updateStoreRating,
  } = require("../models/RatingModel");
  
  // Add a rating for a store
    const createRating = async (req, res) => {
        const { userid, storeid, rating } = req.body;
      
        console.log("Received Payload:", { userid, storeid, rating }); // Debugging log
      
        try {
          // Validate the inputs
          if (!userid || !storeid || !rating) {
            console.error("Validation Error: Missing fields");
            return res.status(400).json({ error: "All fields are required" });
          }
      
          // Add the rating
          const newRating = await addRating(userid, storeid, rating);
          console.log("New Rating Added:", newRating); // Debugging log
      
          // Update the average rating in the stores table
          await updateStoreRating(storeid);
      
          res.status(201).json({ message: "Rating added successfully", rating: newRating });
        } catch (error) {
          console.error("Error adding rating:", error); // Debugging log
          res.status(500).json({ error: "Failed to add rating" });
        }
      };
      
  
  // Get all ratings for a store
  const fetchRatingsByStore = async (req, res) => {
    const { storeid } = req.params;
  
    try {
      console.log("Store ID:", storeid); // Debugging log
      const ratings = await getRatingsByStoreId(storeid);
      console.log("Ratings Fetched:", ratings); // Debugging log
  
      res.json({ ratings });
    } catch (error) {
      console.error("Error fetching ratings:", error);
      res.status(500).json({ error: "Failed to fetch ratings" });
    }
  };
  
  
  module.exports = { createRating, fetchRatingsByStore };
  
const express = require("express");
const { createRating, fetchRatingsByStore } = require("../Controller/RatingController");
const isAuth = require("../Middleware/isAuth");

const router = express.Router();

// POST /ratings - Add a new rating
router.post("/",isAuth, createRating);

// GET /ratings/:storeid - Get all ratings for a specific store
router.get("/:storeid", fetchRatingsByStore);

module.exports = router;

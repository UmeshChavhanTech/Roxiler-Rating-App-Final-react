require('dotenv').config(); // To load the .env file

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./Routes/UserRoute");
const storesRoutes = require("./Routes/StoreRoute");
const ratingsRoutes = require("./Routes/RatingRoute");
const authRoutes = require("./Routes/AuthRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/stores", storesRoutes);
app.use("/ratings", ratingsRoutes);



module.exports = app;

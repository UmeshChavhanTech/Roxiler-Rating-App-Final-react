const express = require("express");
const {
  fetchAllStores,
  fetchStoreById,
  addNewStore,
} = require("../Controller/StoreController");

const router = express.Router();

// GET /stores - Fetch all stores
router.get("/", fetchAllStores);

// GET /stores/:id - Fetch store by ID
router.get("/:id", fetchStoreById);

// POST /stores - Add a new store
router.post("/addstore", addNewStore);

module.exports = router;

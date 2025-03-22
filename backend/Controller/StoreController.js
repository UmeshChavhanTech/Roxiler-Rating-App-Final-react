const {
    getAllStores,
    getStoreById,
    createStore,
  } = require("../models/StoreModel");
  const { getUserByIdAndRole } = require("../models/UserModel");
  
  // Fetch all stores
  const fetchAllStores = async (req, res) => {
    try {
      const stores = await getAllStores();
      res.json({ stores });
    } catch (error) {
      console.error("Error fetching stores:", error);
      res.status(500).json({ error: "Failed to fetch stores" });
    }
  };
  
  // Fetch a store by ID
  const fetchStoreById = async (req, res) => {
    const { id } = req.params;
    try {
      const store = await getStoreById(id);
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }
      res.json({ store });
    } catch (error) {
      console.error("Error fetching store:", error);
      res.status(500).json({ error: "Failed to fetch store" });
    }
  };
  
  // Create a new store
  const addNewStore = async (req, res) => {
    const { name, email, address, rating, storeowner_id } = req.body;
    try {
      // Step 1: Validate storeowner_id
      const storeOwner = await getUserByIdAndRole(storeowner_id, "storeOwner");
      if (!storeOwner) {
        return res.status(400).json({ error: "Invalid storeowner_id or role" });
      }
  
      // Step 2: Create the store
      const newStore = await createStore(
        name,
        email,
        address,
        rating,
        storeowner_id
      );
      res.status(201).json({ store: newStore });
    } catch (error) {
      console.error("Error creating store:", error);
      res.status(500).json({ error: "Failed to create store" });
    }
  };

  const getStoresForAdmin = async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "your-secret-key");
  
      if (decoded.role !== "store_owner") {
        return res.status(403).json({ error: "Unauthorized" });
      }
  
      const store = await Store.findOne({ ownerId: decoded.uid });
      res.json({ store });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = { fetchAllStores, fetchStoreById, addNewStore,getStoresForAdmin };
  
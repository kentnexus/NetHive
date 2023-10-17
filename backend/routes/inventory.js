const express = require("express");
const {
  getInventories,
  getInventory,
  createInventory,
  deleteInventory,
  updateInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

// GET all inventories
router.get("/", getInventories);

// GET a single Inventory
router.get("/:id", getInventory);

// POST a new Inventory
router.post("/", createInventory);

// DELETE a Inventory
router.delete("/:id", deleteInventory);

// UPDATE a Inventory
router.patch("/:id", updateInventory);

module.exports = router;

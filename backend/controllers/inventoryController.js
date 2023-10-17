const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");

// get all inventories
const getInventories = async (req, res) => {
  const inventories = await Inventory.find({}).sort({ createdAt: -1 });

  res.status(200).json(inventories);
};

// get a single inventory
const getInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such record" });
  }

  const inventory = await Inventory.findById(id);

  if (!inventory) {
    return res.status(404).json({ error: "No such record" });
  }

  res.status(200).json(inventory);
};

// create a new inventory
const createInventory = async (req, res) => {
  const { number, vendor, manufacturer, model } = req.body;

  let emptyFields = [];

  if (!number) {
    emptyFields.push("number");
  }
  if (!vendor) {
    emptyFields.push("vendor");
  }
  if (!manufacturer) {
    emptyFields.push("manufacturer");
  }
  if (!model) {
    emptyFields.push("model");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const inventory = await Inventory.create({
      number,
      vendor,
      manufacturer,
      model,
    });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a inventory record
const deleteInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such record" });
  }

  const inventory = await Inventory.findOneAndDelete({ _id: id });

  if (!inventory) {
    return res.status(400).json({ error: "No such record" });
  }

  res.status(200).json(inventory);
};

// update a inventory
const updateInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such record" });
  }

  const inventory = await Inventory.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!inventory) {
    return res.status(400).json({ error: "No such record" });
  }

  res.status(200).json(inventory);
};

module.exports = {
  getInventories,
  getInventory,
  createInventory,
  deleteInventory,
  updateInventory,
};

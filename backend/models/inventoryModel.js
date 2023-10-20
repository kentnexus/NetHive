const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invetorySchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", invetorySchema);

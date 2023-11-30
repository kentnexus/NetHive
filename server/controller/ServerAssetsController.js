const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ServerAssets = require("../models/ServerAssets");

router.get("/", (req, res, next) => {
    ServerAssets.find()
      .sort({ modified_dt: -1 })
      .exec()
      .then((docs) => {
        if (docs.length > 0) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({
            message: "No entries found.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

module.exports = router;
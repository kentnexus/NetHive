const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Asset = require("../models/Assets");

router.get("/", (req, res, next) => {
  Asset.find()
    .sort({ modified_dt: -1 })
    .exec()
    .then((docs) => {
      // console.log(docs);
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No entries found.",
        });
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

const counterSchema = {
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
};

const counterModel = mongoose.model("counter", counterSchema);
const date = new Date();

router.post("/", (req, res, next) => {
  counterModel
    .findOneAndUpdate(
      { id: "autoAssetnNo" },
      { $inc: { seq: 1 } },
      { new: true }
    )
    .then((cd) => {
      let seqId;
      if (cd == null) {
        const newVal = new counterModel({ id: "autoAssetnNo", seq: 1 });
        newVal.save();
        seqId =
          "NH" +
          cd.seq.toLocaleString("en-US", {
            minimumIntegerDigits: 8,
            useGrouping: false,
          });
      } else {
        seqId =
          "NH" +
          cd.seq.toLocaleString("en-US", {
            minimumIntegerDigits: 8,
            useGrouping: false,
          });
      }

      const asset = new Asset({
        assetNumber: seqId,
        customer_account: req.body.customer_account,
        product: req.body.product,
        asset_type: req.body.asset_type,
        device_name: req.body.device_name,
        manufacturer: req.body.manufacturer,
        vendor: req.body.vendor,
        model: req.body.model,
        model_version: req.body.model_version,
        serial_number: req.body.serial_number,
        ip_address: req.body.ip_address,
        snmp_community_string: req.body.snmp_community_string,
        location: req.body.location,
        owner_name: req.body.owner_name,
        contracts_start_dt: req.body.contracts_start_dt,
        contracts_end_dt: req.body.contracts_end_dt,
        aggregated_to_: req.body.aggregated_to_,
        status: req.body.status,
        vendor_account_manager: req.body.vendor_account_manager,
        contact_number: req.body.contact_number,
        contact_email: req.body.contact_email,
        website: req.body.website,
        service_availed: req.body.service_availed,
        cost: req.body.cost,
        cost_frequency: req.body.cost_frequency,
        tags: req.body.tags,
        notes: req.body.notes,
        modified_dt: date,
        customer_name: req.body.customer_name,
        created_by: req.body.created_by,
        created_dt: req.body.created_dt,
      });
      asset
        .save()
        .then((result) => {
          // console.log(result);
          res.status(201).json({
            message: "Handling POST requests to /assets",
            createdAsset: result,
          });
        })
        .catch((err) => {
          // console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/bulk", async (req, res, next) => {
  const data = req.body;
  let stats = [];

  for (let i = 0; i < data.length; i++) {
    const asset = new Asset(data[i]);

    try {
      const { assetNumber } = asset;
      const existingAsset = await Asset.findOne({
        assetNumber,
      });
      if (existingAsset) {
        const updateOps = {};
        for (const [key, value] of Object.entries(asset)) {
          updateOps[key] = value;
        }
        Asset.updateOne(
          {
            assetNumber: assetNumber,
          },
          {
            $set: {
              customer_account: updateOps["_doc"].customer_account,
              product: updateOps["_doc"].product,
              asset_type: updateOps["_doc"].asset_type,
              device_name: updateOps["_doc"].device_name,
              manufacturer: updateOps["_doc"].manufacturer,
              vendor: updateOps["_doc"].vendor,
              model: updateOps["_doc"].model,
              model_version: updateOps["_doc"].model_version,
              serial_number: updateOps["_doc"].serial_number,
              ip_address: updateOps["_doc"].ip_address,
              snmp_community_string: updateOps["_doc"].snmp_community_string,
              location: updateOps["_doc"].location,
              owner_name: updateOps["_doc"].owner_name,
              contracts_start_dt: updateOps["_doc"].contracts_start_dt,
              contracts_end_dt: updateOps["_doc"].contracts_end_dt,
              aggregated_to_: updateOps["_doc"].aggregated_to_,
              status: updateOps["_doc"].status,
              vendor_account_manager: updateOps["_doc"].vendor_account_manager,
              contact_number: updateOps["_doc"].contact_number,
              contact_email: updateOps["_doc"].contact_email,
              website: updateOps["_doc"].website,
              service_availed: updateOps["_doc"].service_availed,
              cost: updateOps["_doc"].cost,
              cost_frequency: updateOps["_doc"].cost_frequency,
              tags: updateOps["_doc"].tags,
              notes: updateOps["_doc"].notes,
              modified_dt: date,
              customer_name: updateOps["_doc"].customer_name,
              created_by: updateOps["_doc"].created_by,
            },
          }
        )
          .exec()
          .then(
            stats.push(data[i].assetNumber + " has been updated.")
          )
          .catch((err) => {
            stats.push(err)
          });
      } else if (!assetNumber) {
        counterModel
        .findOneAndUpdate(
          { id: "autoAssetnNo" },
          { $inc: { seq: 1 } },
          { new: true }
        )
        .then((cd) => {
          let seqId;
          if (cd == null) {
            const newVal = new counterModel({ id: "autoAssetnNo", seq: 1 });
            newVal.save();
            seqId =
              "NH" +
              cd.seq.toLocaleString("en-US", {
                minimumIntegerDigits: 8,
                useGrouping: false,
              });
          } else {
            seqId =
              "NH" +
              cd.seq.toLocaleString("en-US", {
                minimumIntegerDigits: 8,
                useGrouping: false,
              });
          }
        console.log(seqId);
        const new_asset = new Asset({
          assetNumber: seqId,
          customer_account: data[i].customer_account,
          product: data[i].product,
          asset_type: data[i].asset_type,
          device_name: data[i].device_name,
          manufacturer: data[i].manufacturer,
          vendor: data[i].vendor,
          model: data[i].model,
          model_version: data[i].model_version,
          serial_number: data[i].serial_number,
          ip_address: data[i].ip_address,
          snmp_community_string: data[i].snmp_community_string,
          location: data[i].location,
          owner_name: data[i].owner_name,
          contracts_start_dt: data[i].contracts_start_dt,
          contracts_end_dt: data[i].contracts_end_dt,
          aggregated_to_: data[i].aggregated_to_,
          status: data[i].status,
          vendor_account_manager: data[i].vendor_account_manager,
          contact_number: data[i].contact_number,
          contact_email: data[i].contact_email,
          website: data[i].website,
          service_availed: data[i].service_availed,
          cost: data[i].cost,
          cost_frequency: data[i].cost_frequency,
          tags: data[i].tags,
          notes: data[i].notes,
          modified_dt: date,
          customer_name: data[i].customer_name,
          created_by: data[i].created_by,
          created_dt: data[i].created_dt,
        });
        new_asset
          .save()
      })
        stats.push(data[i].seqId + " has been added.")
      } else {
        asset.save(data[i])
        stats.push(data[i].assetNumber + " has been added.")
      }
    } catch (err) {
      stats.push(err)
    }
  }
  // console.log(stats)
  res.send(stats)
});

router.get("/:assetNumber", (req, res, next) => {
  const assetNumber = req.params.assetNumber;
  Asset.findOne({ assetNumber: assetNumber })
    .exec()
    .then((doc) => {
      // console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry for asset",
          assetNumber,
        });
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: "No valid entry for asset",
        assetNumber,
      });
    });
});

router.patch("/:assetNumber", (req, res, next) => {
  const assetNumber = req.params.assetNumber;
  const updateOps = {};

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }

  // console.log(updateOps);

  Asset.updateOne(
    {
      assetNumber: assetNumber,
    },
    {
      $set: {
        product: updateOps.product,
        asset_type: updateOps.asset_type,
        device_name: updateOps.device_name,
        manufacturer: updateOps.manufacturer,
        vendor: updateOps.vendor,
        model: updateOps.model,
        model_version: updateOps.model_version,
        serial_number: updateOps.serial_number,
        ip_address: updateOps.ip_address,
        snmp_community_string: updateOps.snmp_community_string,
        location: updateOps.location,
        owner_name: updateOps.owner_name,
        contracts_start_dt: updateOps.contracts_start_dt,
        contracts_end_dt: updateOps.contracts_end_dt,
        aggregated_to_: updateOps.aggregated_to_,
        status: updateOps.status,
        vendor_account_manager: updateOps.vendor_account_manager,
        contact_number: updateOps.contact_number,
        contact_email: updateOps.contact_email,
        website: updateOps.website,
        service_availed: updateOps.service_availed,
        cost: updateOps.cost,
        cost_frequency: updateOps.cost_frequency,
        tags: updateOps.tags,
        notes: updateOps.notes,
        modified_dt: date,
        customer_account: updateOps.customer_account,
        created_by: updateOps.created_by,
      },
    }
  )
    .exec()
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/bulk", (req, res, next) => {
  Asset.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:assetNumber", (req, res, next) => {
  const assetNumber = req.params.assetNumber;
  
  Asset.deleteOne({
    assetNumber: assetNumber,
  })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });   
});

router.delete("/id/:id", (req, res, next) => {
  const id = req.params.id;
  
  Asset.deleteOne({
    _id: id,
  })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });   
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such record" });
  }
  Asset.findOneAndUpdate(
    {
      _id: id,
    },
    { ...req.body }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

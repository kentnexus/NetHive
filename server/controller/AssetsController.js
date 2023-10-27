const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Asset = require('../models/assets');

router.get('/',  (req, res, next) => {
    Asset
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entries found.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/',  (req, res, next) => {
    const asset = new Asset({
        _id: new mongoose.Types.ObjectId(),
        assetNumber: req.body.assetNumber,
        status: req.body.status,
        asset_type: req.body.asset_type,
        owner_name: req.body.owner_name,
        manufacturer_name: req.body.manufacturer,
        vendor_name: req.body.vendor
    });
    asset
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });


});

router.get('/:productId',  (req, res, next) => {
    const id = req.params.productId;
    const name = req.params.name;
    Asset.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry for asset',
                    name
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No valid entry for asset',
                name
            })
        });
});

router.patch('/:productId',  (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Asset.updateOne({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:productId',  (req, res, next) => {
    const id = req.params.productId;
    Asset.deleteOne({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
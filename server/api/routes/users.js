const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sha = require('sha256');

const User = require('./models/users');

router.get('/', (req, res, next) => {
    User
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

router.post('/', (req, res, next) => {

    const pw = req.body.password;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        status: req.body.status,
        username: req.body.username,
        password: sha(pw).toString('hex'),
        created_by: req.body.created_by, //need to change to current user
        // created_dt: new Date().toLocaleString({timeZone: "America/Vancouver"})
        created_dt: new Date()
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /users',
                createdUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry for user',
                    name
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No valid entry for user',
                name
            })
        });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({
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

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({
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

router.delete('/', (req, res, next) => {
    const id = req.params.userId;
    User.deleteMany()
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
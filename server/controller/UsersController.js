const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const User = require('../models/Users');
const date = new Date();

router.get('/', (req, res, next) => {
    User
        .find()
        .exec()
        .then(docs => {
            // console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entries found.'
                })
            }
        })
        .catch(err => {
            // console.log(err);
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
            // console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry for user'
                });
            }
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                message: 'No valid entry for user'
            })
        });
});

router.patch('/:userId', async (req, res, next) => {
    const id = req.params.userId;
    User.updateOne({
            _id: id
        }, {
            $set: {...req.body,
        // }, {
            // $set: {
                modified_dt: date,
                // password: await bcrypt.hash(req.body.password, 12)
            }
        })
        .exec()
        .then(result => {
            // console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/password/:userId', async (req, res, next) => {
    try {
        const id = req.params.userId;
        const { new_password, current_password, email } = req.body;

        const user = await User.findOne({ email });
        const auth = await bcrypt.compare(current_password, user.password);

        // console.log(await bcrypt.hash(new_password, 12));

        if (!auth) { 
          return res.json({message:'Incorrect password' }) 
        } else {
            User.updateOne({
                _id: id
            }, {
                $set: {password: await bcrypt.hash(new_password, 12)}
            })
            .exec()
            .then(result => {
                // console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                // console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        }
      } catch (error) {
        console.error(error);
      }
});


router.delete('/deleteAll', (req, res, next) => {
    User.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({
        _id: id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
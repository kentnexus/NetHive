const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    role: String,
    username: String,
    password: String,
    created_by: String,
    created_dt: Date
});

module.exports = mongoose.model('User', UserSchema);
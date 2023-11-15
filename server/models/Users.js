const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    role: String,
    company: String,
    status: Boolean,
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Your password is required"]
    },
    created_by: String,
    created_dt: {
        type: Date,
        default: new Date(),
    },
    modified_dt: {
        type: Date,
        default: new Date(),
    }
}, {
    versionKey: false
});

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', UserSchema);
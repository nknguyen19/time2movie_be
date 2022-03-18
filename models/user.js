const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    image: String,
    dob: Date,
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = new mongoose.model('User', UserSchema);

module.exports = User;
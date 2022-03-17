const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    description:String,
    image:String,
    job_title:String,
    dob:Date
}, {timestamps: true});

const User = new mongoose.model('User', UserSchema);

module.exports = User;
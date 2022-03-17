const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:String,
    image:String,
    job_title:String,
    dob:Date
}, {timestamps: true});

const People = new mongoose.model('People', PeopleSchema);

module.exports = People;
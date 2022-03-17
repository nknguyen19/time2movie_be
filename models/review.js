const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userid:{
        type: Number,
        required: true,
    },
    movieid:
    {
        type:Number,
        required:true,
    },
    ratings:Number
}, {timestamps: true});

const Review = new mongoose.model('Review', ReviewSchema);

module.exports = Review;
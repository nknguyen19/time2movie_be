const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userid:{
        type: ObjectId,
        required: true,
    },
    movieid:
    {
        type: ObjectId,
        required:true,
    },
    ratings:Number
}, {timestamps: true});

const Review = new mongoose.model('Review', ReviewSchema);

module.exports = Review;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    episodes:Number,
    release:Date,
    rating: Number,
    image:String,
    country:String,
    director:String,
    starring:String
}, {timestamps: true});

const Movie = new mongoose.model('Movie', MovieSchema);

module.exports = Movie;
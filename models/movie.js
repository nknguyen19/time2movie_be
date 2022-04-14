const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    release: String,
    duration: String,
    gerne: String,
    IMDB_Rating: Number,
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    overview: String,
    metaScore: Number,
    director: String,
    stars: [String],
    noOfVotes: Number,
}, {timestamps: true});

const Movie = new mongoose.model('Movie', MovieSchema);

module.exports = Movie;
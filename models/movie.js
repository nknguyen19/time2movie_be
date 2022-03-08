const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdDate: Date,
}, {timestamps: true});

const Movie = new mongoose.model('Movie', MovieSchema);

module.exports = Movie;
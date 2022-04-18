const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userid: {
        type: ObjectId,
        required: true,
    },
    movieid: {
        type: ObjectId,
        required: true,
    },
    content: String,
}, {timestamps: true});

const Comment = new mongoose.model('Comment', CommentSchema);

module.exports = Comment;
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userid: {
        type: ObjectId,
        required: true,
    },
    commentid: {
        type: ObjectId,
        required: true,
    },
}, {timestamps: true});

const Like = new mongoose.model('Like', LikeSchema);

module.exports = Like;
const Like = require("../models/like");
const User = require("../models/user");

exports.add_like = async (req, res) => {
    const like = await Like.find({
        userid: req.body.userid,
        commentid: req.body.commentid,
    });
    if (like.length === 0) {
        const new_like = new Like({
            userid: req.body.userid,
            commentid: req.body.commentid,
        });
        result = await new_like.save();
        res.send(result);
    } else {
        res.status(400).send({ message: "You have already liked this comment" });
    }
}

exports.remove_like = async (req, res) => {
    const like = await Like.find({
        userid: req.body.userid,
        commentid: req.body.commentid,
    });
    if (like.length !== 0) {
        await Like.findOneAndDelete({
            userid: req.body.userid,
            commentid: req.body.commentid,
        });
        res.send({ message: "Delete like successfully" });
    } else {
        res.status(404).send({ message: "This like does not exist" });
    }
}

exports.get_like = async (req, res) => {
    let likes = await Like.find({ commentid: req.params.commentid });
    res.send(likes);
}
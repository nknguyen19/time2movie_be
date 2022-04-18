const Comment = require("../models/comment");
const User = require("../models/user");

exports.add_comment = async (req, res) => {
    const new_comment = new Comment({
        userid: req.body.userid,
        movieid: req.body.movieid,
        content: req.body.content,
    });
    result = await new_comment.save();
    res.send(result);
}

exports.get = async (req, res) =>
{
    let comments = await Comment.find({ movieid: req.params.movieid });
    for (let i = 0; i < comments.length; i++) {
        const user = await User.findById(comments[i].userid);
        comments[i] = {
            ...comments[i]._doc,
            avatar: user.image,
            name: user.name,
        }
    }
    comments.sort((a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    res.send(comments);
}

exports.remove = async (req, res) => {
    const comment = await Comment.findById(req.body.id);
    if (comment) {
        await Comment.findByIdAndDelete(req.body.id);
        res.send({ message: "Delete comment successfully" });
    }
    else {
        res.status(404).send({ message: "This comment does not exist" });
    }
}
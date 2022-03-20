const Review = require("../models/review")

exports.create_review=function(req,res)
{
    const review= new Review({
        userid:req.body.userid,
        movieid:req.body.movieid,
        ratings:req.body.ratings
    })
    review.save().then((result)=>{
        res.send(result);
    }).catch((err)=>
        {
            res.status(500).send(err);
        })
}

exports.get_review = function(req,res)
{
    Review.find({where:{
        userid:req.body.userid,
        movieid:req.body.movieid}})
        .then((result)=>
        {
            res.send(result);
        })
        .catch((err)=>
        {
            res.status(500).send(err)
        })
}
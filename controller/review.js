const Review = require("../models/review");
const Movie = require("../models/movie");

exports.create_review = async (req, res) => {
    const review = await Review.find({useid: req.body.userid, movieid: req.body.movieid});
    let result;
    if (review.length > 0) { // user already review this movie
        review[0].ratings = req.body.ratings;
        result = await (review[0].save());
    }
    else { // user first review this movie
        const new_review = new Review({
            userid:req.body.userid,
            movieid:req.body.movieid,
            ratings:req.body.ratings
        })
        result = await new_review.save();
    }
    
    const movie = await Movie.findById(req.body.movieid);
    const reviews = await Review.find({movieid: req.body.movieid});
    let new_rating = 0;
    reviews.forEach(element => {
        new_rating += element.ratings;
    });
    new_rating /= reviews.length;
    movie.rating = new_rating;
    movie.save();
    res.send(result);
}

exports.get_review = async (req, res) =>
{
    const review = await Review.find({ useid: req.params.userid, movieid: req.params.movieid});
    if (review.length >0) {
        res.send(review[0]);
    } else {
        res.status(404);
    }
}
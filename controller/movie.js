const Movie = require('../models/movie')

exports.create_movie = (req, res) => {
    const movie = new Movie({
        title:req.body.title,
        episodes:req.body.episodes,
        release:req.body.release,
        rating:req.body.rating,
        image: 'poster/' + req.body.username + '.png',
        country: req.body.country,
        director:req.body.director,
        starring:req.body.starring
    })
    movie.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

exports.get_movie = (req, res) => {
    Movie.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });

}
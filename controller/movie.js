const Movie = require('../models/movie')

exports.create_movie = (req, res) => {
    console.log(req.body.movie, req.body.movie.title, req.file);
    const req_movie = JSON.parse(req.body.movie);
    console.log(req_movie);
    const movie = new Movie({
        title:req_movie.title,
        episodes:req_movie.episodes,
        release:req_movie.release,
        rating:req_movie.rating,
        image: 'movie/' + req.file.filename,
        country: req_movie.country,
        director:req_movie.director,
        starring:req_movie.starring
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
const Movie = require('../models/movie')
const ObjectId = require('mongoose').Types.ObjectId;

exports.create_movie = (req, res) => {
    const req_movie = JSON.parse(req.body.movie);
    
    const movie = new Movie({
        title:req_movie.title,
        episodes:req_movie.episodes,
        release:req_movie.release,
        rating:req_movie.rating,
        image: '/movie/' + req.file.filename,
        country: req_movie.country,
        director:req_movie.director,
        starring:req_movie.starring,
        description: req_movie.description,
    })
    movie.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

exports.get_movie = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: "This movie does not exist "});
        return;
    }
    const movie = await Movie.findById(req.params.id);
    if (movie) {
        res.send(movie);
    }
    else {
        res.status(404).send({ message: "This movie does not exist "});
    }
}

exports.get_all_movie = async (req, res) => {
    const movies = await Movie.find();
    res.send(movies); // TODO: Filter here
}
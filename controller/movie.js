const Movie = require('../models/movie')

exports.create_movie = (req, res) => {
    const movie = new Movie({
        "title": "Ice Age",
        "createdDate": "01/01/2001",
    })
    movie.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.get_movie = (req, res) => {
    Movie.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

}
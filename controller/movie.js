const Movie = require('../models/movie')
const ObjectId = require('mongoose').Types.ObjectId;
const { parse } = require('csv-parse');
const fs = require('fs');

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

exports.get_random = async (req, res) => {
    const movies = await Movie.find();
    const shuffle_movies = movies.sort(() => 0.5 - Math.random()).slice(0, 10);
    res.send(shuffle_movies);
}

exports.get_all_movie = async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
}

exports.get_trending = async (req, res) => {
    let movies = await Movie.find();
    movies.sort((a,b) => {
        return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0);
    } );
    res.send(movies.slice(0, 10));
}

exports.get_newest =  async (req, res) => {
    let movies = await Movie.find();
    movies.sort((a,b) => {
        return (a.release < b.release) ? 1 : ((b.release < a.release) ? -1 : 0);
    } );
    res.send(movies.slice(0, 10));
}

exports.fetch_data = async (req, res) => {
    let csvData = [];
    fs.createReadStream('data/imdb_top_1000.csv')
        .pipe(parse())
        .on('data', (csvrow) => {
            csvData.push(csvrow);        
        })
        .on('end', async () => {
            for (let i = 1; i < csvData.length; ++i) {
                const movie = new Movie({
                    title: csvData[i][0],
                    release: csvData[i][1],
                    duration: csvData[i][2],
                    gerne: csvData[i][3],
                    IMDB_Rating: csvData[i][4],
                    overview: csvData[i][5],
                    metaScore: csvData[i][6],
                    director: csvData[i][7],
                    stars: [csvData[i][8], csvData[i][9], csvData[i][10], csvData[i][11]],
                    noOfVotes: csvData[i][12],
                    rating: Math.random() * 5,
                })
                await movie.save();
            }
        });
}

exports.get_similar_movie = async (req, res) => {
    let csvData = [];

    fs.createReadStream(`data/movie_recommendations/${req.params.id}.csv`)
    .pipe(parse())
    .on('data', (csvrow) => {
        csvData.push(csvrow);        
    })
    .on('end', async () => {
        csvData = csvData.slice(1);
        result = csvData.sort(() => 0.5 - Math.random()).slice(0, 10);
        let data = [];
        for (let i = 0; i < result.length; ++i) {
            const movie = await Movie.findById(result[i][0]);
            data.push(movie);
        }
        res.send(data);
    });
}

exports.bot_reply = async (req, res) => {
    const user_message = req.body.message;
    const chatBot = app.chatBot;
    chatBot.send(`${req.body.user_id} ${req.body.message}`);
    const wait = setInterval(() => {
        if (app.chatBotReplies.get(req.body.user_id)) {
            res.send({ message: app.chatBotReplies.get(req.body.user_id)});
            app.chatBotReplies.delete(req.body.user_id);
            clearInterval(wait);
        }
    }, 500);
}

exports.get_user_recommendation = async (req, res) => {
    const user_id = req.params.id;
    const userRecommender = app.userRecommender;
    userRecommender.stdin.write(user_id + "\n");
    userRecommender.stdout.once('data',async (data) => {
        const movies_id = JSON.parse(data.toString().replaceAll('\'', '"'));
        let result = [];
        for (let i = 0; i < movies_id.length; ++i) {
            const movie = await Movie.findById(movies_id[i]);
            result.push(movie);
        }
        res.send(result.sort(() => 0.5 - Math.random()).slice(0, 10)); 
    })
}
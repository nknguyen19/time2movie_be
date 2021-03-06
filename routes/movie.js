const { builtinModules } = require('module')
const express = require('express'),
router = express.Router(),
movie = require('../controller/movie')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/movie');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({ storage: storage }).single('file');

router.post('/create', upload, movie.create_movie);
router.get('/get/:id', movie.get_movie);
router.get('/get', movie.get_random);
router.get('/getall', movie.get_all_movie);
router.get('/get-trending', movie.get_trending);
router.get('/get-newest', movie.get_newest);
router.get('/fetch-data', movie.fetch_data);
router.get('/get-similar/:id', movie.get_similar_movie);
router.post('/bot-reply', movie.bot_reply);
router.get('/get-user-recommendation/:id', movie.get_user_recommendation)
module.exports = router
const { builtinModules } = require('module')
const express = require('express'),
router = express.Router(),
movie = require('../controller/movie')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'react-app/public/movie');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({ storage: storage }).single('file');

router.post('/create', upload, movie.create_movie);
router.get('/get', movie.get_movie);

module.exports = router
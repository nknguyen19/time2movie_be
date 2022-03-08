const { builtinModules } = require('module')

const express = require('express'),
router = express.Router(),
movie = require('../controller/movie')

router.get('/create', movie.create_movie);
router.get('/get', movie.get_movie);

module.exports = router
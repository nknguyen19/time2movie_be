const { builtinModules } = require('module')

const express = require('express'),
router = express.Router(),
user = require('../controller/user')

router.post('/create', user.create_user);
router.post('/login-facebook', user.login_facebook);
router.get('/get-user/:id', user.get_user)

module.exports = router
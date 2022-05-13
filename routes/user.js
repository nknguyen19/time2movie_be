const { builtinModules } = require('module')

const express = require('express'),
    router = express.Router(),
    user = require('../controller/user')

router.post('/create', user.create_user);
router.post('/login-facebook', user.login_facebook);
router.get('/get-user/:id', user.get_user);
router.post('/signin', user.signin);
router.get('/get-current-user', user.get_current_user);
router.post('/login-google', user.login_google);

module.exports = router
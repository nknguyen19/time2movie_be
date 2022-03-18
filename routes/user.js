const { builtinModules } = require('module')

const express = require('express'),
router = express.Router(),
user = require('../controller/user')

router.post('/create', user.create_user)

module.exports = router
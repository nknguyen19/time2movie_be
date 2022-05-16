const { builtinModules } = require('module')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({ storage: storage }).single('file');

const express = require('express'),
    router = express.Router(),
    user = require('../controller/user')

router.post('/create', user.create_user);
router.post('/login-facebook', user.login_facebook);
router.get('/get-user/:id', user.get_user);
router.post('/signin', user.signin);
router.get('/get-current-user', user.get_current_user);
router.post('/login-google', user.login_google);
router.post('/image-upload', upload, user.image_upload);
router.post('/update-user/:id', user.update_user);
module.exports = router
const User = require('../models/user')
const download = require('image-downloader');
const { isRequired } = require('nodemon/lib/utils');

exports.create_user = async (req, res) => {
    const user = await User.find({username: req.body.username});
    if (user.length !== 0) {
        res.status(409).send({ message: "This username already exists" });
    }
    else {
        const new_user = new User({
            username: req.body.username,
            password: req.body.password,
        })
        const result = await new_user.save();
        res.send(result);
    }
};

exports.login_facebook = async (req, res) => {
    const user = await User.find({username : req.body.username});
    if (user.length === 0) {

        const options = {
            url: req.body.avatar,
            dest: '../../react-app/public/avatar/' + req.body.username + '.png',
        }

        const filename = await download.image(options);
        console.log('Saved to', filename)

        const new_user = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            image: 'avatar/' + req.body.username + '.png',
        })

        const result = await new_user.save();
        res.send(result);
    }
    else res.send(user[0])
}

exports.get_user = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
}

exports.signin = async (req, res) => {
    console.log(req.session);
    const username = req.body.username;
    const user = await User.find({username: username});
    if (user.length === 0) {
        res.status(401).send({ message: "This account does not exist" });
    }
    else if (user[0].password === req.body.password) {
        res.send(user[0]);
        req.session.user = user[0];
        console.log(req.session);
    }
    else {
        res.status(401).send({ message: "Incorrect Password" });
    }
}
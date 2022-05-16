const User = require('../models/user')
const download = require('image-downloader');
const { isRequired } = require('nodemon/lib/utils');
const jwt_decode = require('jwt-decode');


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
        req.session.current_user = result;
        res.send(result);
    }
};

exports.login_facebook = async (req, res) => {
    const user = await User.find({username : req.body.username});
    if (user.length === 0) {

        const options = {
            url: req.body.avatar,
            dest: '../../public/avatar/' + req.body.username + '.png',
        }

        const filename = await download.image(options);

        const new_user = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            image: '/avatar/' + req.body.username + '.png',
        })

        const result = await new_user.save();
        req.session.current_user = result;
        res.send(result);
    }
    else {
        req.session.current_user = user[0];
        res.send(user[0]);
    }
}
exports.login_google = async (req,res)=>{
    //parse credentials
    const parsedCredentials = jwt_decode(req.body.credentials);
    const user = await User.find({username: parsedCredentials.email});
    if (user.length === 0) {

        const options = {
            url: parsedCredentials.picture,
            dest: '../../public/avatar/' + parsedCredentials.email + '.png',
        }
        const filename = await download.image(options);

        const new_user = new User({
            username: parsedCredentials.email,
            password: parsedCredentials.nbf,
            name: parsedCredentials.name,
            image: '/avatar/' + parsedCredentials.email + '.png',
        })

        const result = await new_user.save();
        req.session.current_user = result;
        res.send(result);
    }
    else
    {
        req.session.current_user = user[0];
        res.send(user[0]);
    }
}

exports.get_user = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send({ user: user, session: req.session });
}

exports.signin = async (req, res) => {
    const username = req.body.username;
    const user = await User.find({username: username});
    if (user.length === 0) {
        res.status(401).send({ message: "This account does not exist" });
    }
    else if (user[0].password === req.body.password) {
        res.send(user[0]);
        req.session.current_user = user[0];
    }
    else {
        res.status(401).send({ message: "Incorrect Password" });
    }
}

exports.get_current_user = (req, res) => {
    if (req.session.current_user) {
        res.send(req.session.current_user);
    }
    else {
        res.status(408).send({ message: "Session timeout"});
    }
}

exports.image_upload = async (req, res) => {
    res.send(`/avatar/${req.file.filename}`);
}

exports.update_user = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user.length === 0) {
        res.status(404).send({ message: "User not found" });
    }
    else {
        user.name = req.body.name;
        user.image = req.body.image;
        user.dob = req.body.dob;
        const result = await user.save();
        res.send(result);
    }
}
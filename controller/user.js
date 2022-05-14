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
        console.log('Saved to', filename)

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
    //console.log(req.body);
    const parsedCredentials = jwt_decode(req.body.credentials);
    //console.log(parsedCredentials);
    const user = await User.find({username: parsedCredentials.email});
    if (user.length === 0) {

        const options = {
            url: parsedCredentials.picture,
            dest: '../../public/avatar/' + parsedCredentials.email + '.png',
        }
        const filename = await download.image(options);
        console.log('Saved to', filename)

        const new_user = new User({
            username: parsedCredentials.email,
            password: parsedCredentials.nbf,
            name: parsedCredentials.name,
            image: '/avatar/' + parsedCredentials.email + '.png',
        })

        const result = await new_user.save();
        req.session.current_user = result;
        console.log(result);
        res.send(result);
    }
    else
    {
        req.session.current_user = user[0];
        res.send(user[0]);
    }
}
exports.save_changes = async(req,res)=>{
    console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    current_name = req.body.name;
    dob = req.body.dob;
    old_username = req.body.original;
    if (username === '') 
    {
        username = old_username;
    }
    console.log(res.body);
    const user = await User.find({username: old_username});
    const conflict = await User.find({username: username});
    if (user.length === 0) {
        res.status(401).send({ message: "This account does not exist" });
    }
    else if(conflict.length >= 2)
    {
        res.status(409).send({ message: "This username already exists" });
    }
    else {
        user[0].username = username;
        user[0].password = password;
        user[0].dob = dob;
        user[0].name = current_name;
        res.send(user[0]);
    }
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
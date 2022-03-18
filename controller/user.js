const User = require('../models/user')

exports.create_user = (req, res) => {

    console.log(req.body);
    const new_user = new User({
        username: req.body.username,
        password: req.body.password,
    })

    new_user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

    req.on('data', function (data) {
        body += data;
        console.log(data);
    })
};
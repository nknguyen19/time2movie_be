const User = require('../models/user')
const download = require('image-downloader')

exports.create_user = async (req, res) => {
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
};

exports.login_facebook = async (req, res) => {
    const user = await User.find({username : req.body.username});
    if (user.length === 0) {

        const options = {
            url: req.body.avatar,
            dest: '../../react-app/public/avatar/' + req.body.username + '.png',
        }

        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
            })
            .catch((err) => console.error(err))

        const new_user = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            image: 'avatar/' + req.body.username + '.png',
        })

        req.session.User = new_user;

        new_user.save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else res.send(user[0])
}

exports.get_user = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.send(result);
        })

}
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const path = require("path");
const {PythonShell} = require('python-shell')
app = express()

app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(session({
    resave: true, 
    saveUninitialized: false, 
    secret: '1234567', 
    cookie: { maxAge: 60000 }
}));   

const { spawn } = require('child_process');
//movie recommender process
app.movieRecommender = spawn('python3', ['controller/MovieRecommender.py']);
// app.chatBot = spawn('python3', ['controller/bot/main.py']);
app.userRecommender = spawn('python3', ['controller/recommender/recommender.py']);
const dbURI = "mongodb+srv://cs422:time2movie@time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority" //connnection string to mongodb

app.chatBot = new PythonShell('controller/bot/main.py');
app.chatBotReplies = new Map();
app.chatBot.on('message', (message) => {
    const res = message.toString().split(': ');
    res.length > 1 && app.chatBotReplies.set(res[0], res[1]);
})

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log('Listening to port' + PORT);

        });
    })
    .catch((err) => console.log(err));

require('dotenv').config()

app.use(function(req, res, next) {
    const allowedOrigins = ["http://localhost:3000", "https://enigmatic-lake-66448.herokuapp.com"];
    const origin = req.headers.origin;
    console.log(origin);
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/", express.static(path.join(__dirname, "./public")));

app.use('/api/user/', require('./routes/user'));
app.use('/api/movie/', require('./routes/movie'));
app.use('/api/people/',require('./routes/people'));
app.use('/api/review/',require("./routes/review"));
app.use('/api/comment/',require("./routes/comment"));
app.use('/api/like/',require("./routes/like"));

app.all("*", (req, res) => {
    res.status(404).send()
})

const PORT = process.env.PORT || 3001

module.exports = app;

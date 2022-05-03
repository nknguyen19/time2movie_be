const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const path = require("path");

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
app.chatBot = spawn('python3', ['controller/bot/main.py']);

//connnection string to mongodb
const dbURI = "mongodb+srv://cs422:time2movie@time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log('Listening to port' + PORT);
        });
    })
    .catch((err) => console.log(err));

require('dotenv').config()

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

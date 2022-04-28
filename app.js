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

// const runPy = new Promise(function(success, nosuccess) {

//     const { spawn } = require('child_process');
//     const pyprog = spawn('python3', ['controller/recommend.py']);

//     pyprog.stdout.on('data', function(data) {
//         success(data);
//     });
// });
 
//connnection string to mongodb
const dbURI = "mongodb+srv://cs422:time2movie@time2movie.kuhyb.mongodb.net/cs422?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log('Listening to port' + PORT);
            // runPy.then((data) => {
            //     const obj = JSON.parse(data.toString().replaceAll('\'', '"'));
            //     console.log(obj[0]["price"]);
            // })
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


const express = require('express')
const mongoose = require('mongoose')

app = express()

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
    
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


app.get('/', (req, res) => {
    res.send("Hello World !!!")
})

app.use('/api/user/', require('./routes/user'));
app.use('/api/movie/', require('./routes/movie'));
app.use('/api/people/',require('./routes/people'));
app.use('/api/review/',require("./routes/review"));

app.all("*", (req, res) => {
    res.status(404).send()
})

const PORT = process.env.PORT || 3001


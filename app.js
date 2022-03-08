const express = require('express')
const mongoose = require('mongoose')

app = express()

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

const PORT = process.env.PORT || 3001


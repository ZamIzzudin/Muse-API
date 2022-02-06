// Setup Library
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('express')
const helmet = require('helmet');

// Setup Router
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000


app.use(cors());
app.use(helmet());

// Setup bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Database Connection
mongoose.connect('Your DB Here')
// mongoose.connect('mongodb://localhost/MuseDB')
.then( () => { console.log('connection successfully') })
.catch( err => console.log(err) );

// Run Routes
app.use('/', router)

app.get('*', (req, res) => {
    res.send({
        status : 404,
        message: 'inappropriate command, please read the documentation at {LINK}'
    })
})

app.listen(port, () => {
    console.log('listening on port : ' + port)
})
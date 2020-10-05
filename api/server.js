const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const userRoutes=require('./routes/userRoutes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});

app.use('/users',userRoutes);

module.exports = app
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require("body-parser");

const app = express()

let useEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: './configs/config.'+ useEnv +'.env' });

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// redirect all api on api router
app.use('/api', require('./api/routes'))

// Handler for undefined api's
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.PORT || 7070;

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use static directory
app.use(express.static('./src/public'));

// route requires
const indexRouter = require('./routes/index.router');

// use routes

app.use('/', indexRouter); // catch all must be last

// server listening
app.listen(port, () => {
    console.log('Server listening on port: ', port);
}); // end listen
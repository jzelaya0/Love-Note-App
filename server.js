// BASE SETUP
// ==================================================
var express    = require('express');//Get express
var app        = express();//Create app with express
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var port       = process.env.PORT || 3000;


// CONFIGURATION
// ==================================================
//Use Body Parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// START SERVER
// ==================================================
app.listen(port);
console.log('Listening on PORT: ', port);

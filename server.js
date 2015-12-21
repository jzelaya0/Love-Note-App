// BASE SETUP
// ==================================================
var express    = require('express');//Get express
var app        = express();//Create app with express
var mongoose   = require('mongoose');//Use with Mongo Database
var morgan     = require('morgan');//Log all requests to the console
var bodyParser = require('body-parser');//Grab info from POST requests
var config     = require('./config');


// DATABASE CONNECTION
// ==================================================
//Connect to Database
mongoose.connect(config.database);
// Test Database Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not establish database connection'));
db.once('open', function(){
  console.log("Successufl database connection");
})


// CONFIGURATION
// ==================================================
//Use Body Parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Log all API requests to the console
app.use(morgan('dev'));


// START SERVER
// ==================================================
app.listen(config.port);
console.log('Listening on PORT: ', config.port);

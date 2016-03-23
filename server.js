// BASE SETUP
// ==================================================
var express    = require('express');//Get express
var app        = express();//Create app with express
var mongoose   = require('mongoose');//Use with Mongo Database
var morgan     = require('morgan');//Log all requests to the console
var bodyParser = require('body-parser');//Grab info from POST requests
var config     = require('./config');
var path       = require('path');


// DATABASE CONNECTION
// ==================================================
//Connect to Database
mongoose.connect(config.database);
// Test Database Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not establish database connection'));
db.once('open', function(){
  console.log("Successful database connection");
});


// CONFIGURATION
// ==================================================
//Use Body Parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configuration for CORS requests
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


// Log all API requests to the console
app.use(morgan('dev'));

// Use static file assests for from Front End
app.use(express.static(__dirname + '/public'));


// ROUTES
// ==================================================
var apiRoutes = require('./app/routes/api')(app,express);
// prefix "/api" to the API routes
app.use('/api', apiRoutes);

// CATCHALL ROUTE
// SEND USERS TO FRONT END
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER
// ==================================================
app.listen(config.port);
console.log('Listening on PORT: ', config.port);

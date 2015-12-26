// app/routes/api.js
var bodyParser = require('body-parser');
var User       = require('../models/user');


module.exports = function(app,express){
  //Create new instance of Express router
  var apiRouter = express.Router();

  // API USER - CREATE A NEW USER
  // ==================================================
  // Route ending with /users
  apiRouter.post('/users', function(req,res){
    // Create a new user instance from the User Model
    var user = new User();

    // Set user's information
    user.name     = req.body.name;
    user.username = req.body.username;
    user.email    = req.body.email;
    user.password = req.body.password;

    //Save the new user and check for errors
    user.save(function(err){
     if(err){
       //A duplicate username or password was inputted
       if(err.code == 11000){
         return res.json({success: false, message: 'A user with that username or email exists'});
       }else {
         return res.send(err);
       }
     }
     res.json({message: 'User successfully created!'});
   });//End save
  });

// MIDDLEWARE
  // ==================================================
  apiRouter.use(function(req,res,next){
    console.log('A visitor has arrived');

    next();
  });

  // TEST ROUTE
  // =========================
  apiRouter.get('/', function(req,res){
    res.json({message:'Welcome to the Love Note API!'});
  });

  return apiRouter;
};//End module exports

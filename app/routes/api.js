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
        //Check for either duplicate usernames or email addresses
        if(err.errors.username !== null || err.errors.email !== null){
          var username = err.errors.username;
          var email = err.errors.email;
          //Respond with username or email error message
          return res.send({
            username_Error: username,
            email_Error: email
          });
        }
      }
    res.json({message: 'Alright! User was created!'});
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


  // API USER ROUTES
  // ==================================================
  // Routes ending in - /users
  apiRouter.route('/users')
      //GET - all users at /api/users
      .get(function(req,res){
        User.find(function(err,users){
          //Send errors if any
          if(err)
            res.send(err);
          //Respond with all users
          res.json(users);
        });
      })//end get all users

      

  return apiRouter;
};//End module exports

// app/routes/api.js
var bodyParser = require('body-parser');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

//Scret to create tokens
var superSecret = config.secret;

module.exports = function(app,express){
  //Create new instance of Express router
  var apiRouter = express.Router();

  // API AUTHENTICATE
  // ==================================================
  //Authenticate a user at /api/authenticate
  apiRouter.post('/authenticate', function(req,res){
    User.findOne({email: req.body.email})
      .select('name username email password')
      .exec(function(err, user){
        //Throw error if any
        if(err) throw err;

        //If no user with that username was found
        if(!user){
          res.json({success: false, message: 'Authentication Failed: Username not found.'});
        }else if(user){
          //Check for password match
          var validPassword = user.comparePassword(req.body.password);
          if(!validPassword){
            res.json({success: false, message: 'Authentication Failed: Wrong password.'});
          }else {
            //If valid password
            var token = jwt.sign({
              username: user.username},
              superSecret,
              {expiresInMinutes: 1440});//Expires in 24 hours

            //Return the info and token as json
            res.json({
              success: true,
              message: "Here is your token!",
              token: token
            });//end json response
          }
        }
      });//end find one
  });//end authenticate


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



  // TOKEN MIDDLEWARE
  // ==================================================
  apiRouter.use(function(req,res,next){
    //Check POST params OR URL params OR HEADER for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //Decode the token
    if(token){
      //Verifiy secret and check expiration
      jwt.verify(token, superSecret, function(err, decoded){
        if(err){
          res.status(403).send({success: false, message: 'Failed to authenticate token.'});
        }else {
          //If token checks out - Save request to be used in other routes
          req.decoded = decoded;
          //GET USER INFO HERE
          User.findOne({email: decoded.email}, function(err,user){
            req.user = user;
            //Move on to the next route
            next();
          });
        }
      });//end jwt
    }else {
      //If no token is provided - Return HTTP 403(access forbidden) response and error message
      res.status(403).send({success: false, message: 'No token provided.'});
    }

  });//end middleware



  // TEST ROUTE
  // =========================
  apiRouter.get('/', function(req,res){
    res.json({message:'Welcome to the Love Note API!'});
  });



  // API USER ROUTES
  // ==================================================
  //GET - all users at /api/users
  apiRouter.route('/users')
      .get(function(req,res){
        User.find(function(err,users){
          //Send errors if any
          if(err) res.send(err);
          //Respond with all users
          res.json(users);
        });
      });//end get all users

  //GET - single user by id at /api/users/:user_id
  apiRouter.route('/users/:user_id')
      .get(function(req,res){
        User.findById(req.params.user_id, function(err,user){
          //Send errors if any
          if(err) res.send(err);
          //Respond with user
          res.json(user);
        });
      })//end get single user

  //UPDATE - single user by id at /api/users/:user_id
      .put(function(req,res){
        User.findById(req.params.user_id, function(err,user){
          //Send errors if any
          if(err) res.send(err);

          //Update user's info only if it is new
          if(req.body.name) user.name = req.body.name;
          if(req.body.username) user.username = req.body.username;
          if(req.body.email) user.email = req.body.email;
          if(req.body.password) user.password = req.body.password;

          //Save the user's new info
          user.save(function(err){
            //Send errors if any
            if(err) res.send(err);
            //Respond with a successful message
            res.json({message: "User successfully updated!"});
          });//end user save
        });//end user query
      })//end update single user

  //DELETE - single user by id at /api/users/:user_id
      .delete(function(req,res){
        User.remove({_id: req.params.user_id}, function(err,user){
          //Send errors if any
          if(err) res.send(err);
          //Respond with a successful message
          res.json({message: 'Successfully deleted user!'});
        });
      });//end delete single user

  return apiRouter;
};//End module exports

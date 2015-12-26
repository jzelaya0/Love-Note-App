// app/routes/api.js
var bodyParser = require('body-parser');
var User       = require('../models/user');

module.exports = function(app,express){
  //Create new instance of Express router
  var apiRouter = express.Router();

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

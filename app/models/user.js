// USER MODEL

// Requirements for User Model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

// USER SCHEMA
// ==================================================
var UserSchema = new Schema({
  name: String,
  username: {type: String, requried: true, index: {unique: true}},//Prevent duplicate user names
  email: {type: String, requried: true, index: {unique: true}},//Prevent duplicate email addresses
  password: {type: String, required: true, select: false}//Prevent returning password on queries
});


// PASWORD HASH
// ==================================================
UserSchema.pre('save', function(next){
  var user = this;

  // If password hasn't changed or isn't new - Then hash password
  if(!user.isModified('password')) return next();

  //Make it Salty!
  bcrypt.hash(user.password,null, null, function(err,hash){
    if(err) return next(err);

    //Change the password to the hashed version
    user.password = hash;
    next();
  });
});


//Method to compare user's inputted password with hashed password in database
UserSchema.methods.comparePassword = function(password){
  var user = this;

  return bcrypt.compareSync(password,user.password);
};


UserSchema.plugin(uniqueValidator);

// Create a user model from Schema
var User = mongoose.model('User', UserSchema);
//Export the user model
module.exports = User;

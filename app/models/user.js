// USER MODEL

// Requirements for User Model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// USER SCHEMA
// ==================================================
var UserSchmea = new Schema({
  name: string,
  username: {type: String, requried: true, index: {unique: true}},//Prevent duplicate user names
  email: {type: String, requried: true, index: {unique: true}},//Prevent duplicate email addresses
  password: {type: String, required: true, select: false}//Prevent returning password on queries
});


// Create a user model from Schema
var User = mongoose.model('User', UserSchema);
//Export the user model
module.exports = User;

// Note MODEL

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


// Note SCHEMA
// ==================================================
var NoteSchema = new Schema({
  title: String,
  body: String,
  category: String,
  date_created: {type: Date, default: Date.now},
  created_by: {type: Schema.ObjectId, ref: 'User'}//Reference note's creator
});


//Create a note model from schema
var Note = mongoose.model('Note', NoteSchema);

//Export the note model
module.exports = Note;

//step 3
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({ //creates new Schema, also to be used, but as a reference.
  email: {type: String, lowercase: true},
  username: {type: String, required: true},
  level: {type: Number},
  location: {type: String},
  member: {type: Boolean}
})

module.exports = mongoose.model('User', userSchema); //Since this schema is to be used as a reference, we export it as a model instead.

//step 2
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({  //creates new schema exclusively for bird info, to be exported and used later
  name: {type: String, lowercase: true},
  order: {type: String, lowercase: true, maxlength: 20},
  status: {
    type: String,
    lowercase: true,
    enum: [
      "extinct",
      "near threatened",
      "least concern"
    ]
  }
})

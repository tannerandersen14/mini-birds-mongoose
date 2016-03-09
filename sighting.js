//step 4 part one
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var birdSchema = require('./bird.js') //imports schema from bird.js


var sightingSchema = new Schema({
  user: {type: String, ref: 'User'}, //references User from user.js, we don't need to require this at the top because it references the collection of user data, not the model itself.
  birds: [birdSchema] //embeds the bird schema from bird.js, adding its info to our new Schema
  confirmed: {type: Boolean, default: false},
  numberSeen: {type: Number, min: 1}
})

module.exports = mongoose.model('Sighting', sightingSchema); //final product, with full references and outside schema, ready for use.

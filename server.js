var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Sighting = require('./sighting.js')
  User = require('./user.js') //require the new user model from user.js
  app = express();

app.use(bodyParser.json());

mongoose.set('debug', true);
mongoose.connect("mongodb://localhost/even-more-fun");
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB")
})

//step 4 part 2
app.post('/api/users', function(req, res) { //new post request for users, just uses the User model which we required at the top of the page
  var user = new User(req.body);
  user.save(function(err, s) {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.json(s);
    }
  });
});
//step 5
app.post('/api/sighting', function(req, res) { //This still works, the portion of readme asking for its change was a trick question
  var sighting = new Sighting(req.body);
  sighting.save(function(err, s) {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send(s);
    }
  });
});
app.get('/api/sighting', function(req, res, next) {
  var query;
  if (req.query.status) {
    query = {status: req.query.status}
  } else {
    query = {};
  }
  Sighting.find(query).populate('user').exec(function(err, s) { //added .populate to populate the request with user data, and added .exec to chain the next function. Without exec it doesn't chain.
    return res.send(s);
  });
})
app.put("/api/sighting", function(req, res) {
  Sighting.findById(req.query.id, function(err, sighting) {
    sighting.update(req.body, function(err, s) {
      if (err) {
        return res.status(500).send(err);
      } else {
        Sighting.findById(req.query.id, function(e, s) {
          return res.send(s);
        });
      }
    });
  });
});
app.delete('/api/sighting', function(req, res) {
  Sighting.findByIdAndRemove(req.params.id, function(err, s) {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send(s);
    }
  })
})



app.listen(9001, function() {
  console.log('This port is over 9000!!!!');
})

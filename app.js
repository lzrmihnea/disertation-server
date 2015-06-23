var express = require('express');
require('express-mongoose');
var routes = require('./routes');
var middleware = require('./middleware');
var mongoose = require('mongoose');
//var User = mongoose.model('User');


mongoose.connect('mongodb://localhost', function(err){
  if (err) throw err;

  var app = express();
  middleware(app);
  routes(app);

  app.listen(3000, function() {
    console.log('now listening on http://localhost:3000');
  })
});
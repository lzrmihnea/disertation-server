var errors = require('./errors');
var setupSimInfo = require('./setupSimParams');
var mongoose = require('mongoose');
var Simulation = require('./../models/simulation.js');
mongoose.model('Simulation');


module.exports = function (app) {

  // home page
  app.get('/', function(req, res, next){
      res.render('home.jade');
  })

  setupSimInfo(app);

  //error handlers
  errors(app);
}
var errors = require('./errors');
var patients = require('./patients');
var simulations = require('./simulations');
var mongoose = require('mongoose');
var Simulation = require('./../models/simulation.js');
var Patient = require('./../models/patient.js');
mongoose.model('Simulation');
mongoose.model('Patient');


module.exports = function (app) {

  // home page
  app.get('/', function(req, res, next){
      res.render('home.jade');
  })

  patients(app);

  simulations(app);

  //error handlers
  errors(app);
}
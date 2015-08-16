var Simulation = require('./../models/simulation.js');
var Patient = require('./../models/patient.js');
var errors = require('./errors');
var patients = require('./patients');
var simulations = require('./simulations');
var mongoose = require('mongoose');
mongoose.model('Simulation');
mongoose.model('Patient');


module.exports = function (app) {

  // home page
  app.get('/', function(req, res, next){
      res.render('home.jade', {title: 'Dissertation server'});
  })

  patients(app);

  simulations(app);

  //error handlers
  errors(app);
}
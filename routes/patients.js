/**
 * Created by Mihnea on 7/4/2015.
 */
/**
 * Created by Mihnea on 6/14/2015.
 */

var Simulation = require('./../models/simulation.js');
var Patient = require('./../models/patient.js');
var mongoose = require('mongoose');
mongoose.model('Simulation');
var Pacient = mongoose.model('Patient');


module.exports = function (app) {

    app.get("/patients", function (req, res, next) {
        Pacient.find().sort('lastname').exec(function (err, pacients) {
            if (err) return next(err);
            res.render('patients.jade', {pacients: pacients});
        })
    });

    app.post("/addPatient", function (req, res, next) {

        var cnp = req.body.cnp;
        var lastname = req.body.lastname;
        var firstname = req.body.firstname;
        var address = req.body.address;
        Pacient.create({
            _id: cnp,
            name:{
                last:lastname,
                first:firstname
            },
            address: address
        }, function (err, pacient) {
            if (err) return next(err);
        });

        return res.redirect('/patients');
    });

    app.get("/patient/:id", function(req, res,next){
        var cnp=req.params.id;
        Patient.findById(cnp).exec(function(err,patient) {
            if(err) return next(err);

            if(!patient) return next(); //404

            res.render('patient.jade', {patient:patient});
        });
    })
    //
    //
    //app.post("/patients", function (req, res, next) {
    //
    //    var cnp = req.body.cnp;
    //    var lastname = req.body.lastname;
    //    var firstname = req.body.firstname;
    //    var address = req.body.address;
    //    console.log('cnp: ' + cnp);
    //    console.log('lastname: ' + lastname);
    //    console.log('firstname: ' + firstname);
    //    console.log('address: ' + address);
    //
    //    //var patient = createPatientObject(cnp, lastname, firstname, address);
    //
    //    //Patient.findById(patient, function (err, foundPatient) {
    //    //});
    //
    //    return res.redirect('/patients');
    //});


};
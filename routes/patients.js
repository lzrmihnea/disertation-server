/**
 * Created by Mihnea on 7/4/2015.
 */
/**
 * Created by Mihnea on 6/14/2015.
 */

var mongoose = require('mongoose');
var SimulationSchema = mongoose.model('Simulation');
var PatientSchema = mongoose.model('Patient');
var dateformat = require('dateformat');


module.exports = function (app) {

    app.get("/patients", function (req, res, next) {
        PatientSchema.find().sort('lastname').exec(function (err, pacients) {
            if (err) return next(err);
            return res.render('patients.jade', {patients: pacients});
        })
    });

    app.post("/addPatient", function (req, res, next) {

        var cnp = req.body.cnp;
        var lastname = req.body.lastname;
        var firstname = req.body.firstname;
        var address = req.body.address;
        PatientSchema.create({
            _id: cnp,
            name:{
                last:lastname,
                first:firstname
            },
            address: address
        }, function (err, patient) {
            if (err) return next(err);
        });

        return res.redirect('/patients');
    });

    app.get("/patient/:id", function(req,res,next){
        var cnp=req.params.id;
        PatientSchema.findById(cnp).exec(function(err,patient) {
            if(err) return next(err);

            if(!patient) return next(); //404

            return res.render('patient.jade', {patient:patient});
        });
    });

    app.post("/patient/:id", function (req, res, next) {

        var patient_id = req.body.patient_id;
        var currentSimulation = SimulationSchema.createSimFromReq(req);

        SimulationSchema.create(currentSimulation, function (error, createdSim) {
            //Validation error handling here
            if (error) {
                PatientSchema.findById(patient_id).exec(function(err,patient) {
                    if(err) return next(err);
                    if(!patient) return next(); //404
                    return res.render('patient.jade', {patient:patient, error:error});
                });
            }
            else console.log('ispravit-o');
            if(createdSim) {
                var simID = createdSim._id.toString();
                var simCreationDate = dateformat(createdSim.created, "dd.mm.yyyy, hh:MM:ss");

                console.log(simID);
                PatientSchema.update(patient_id,{$push:{simulations:{_id:simID, created:simCreationDate}}}, function(err,result){
                    if(err) return next(err);
                });
                return res.redirect("/patient/"+patient_id);
            };
        });

    });

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
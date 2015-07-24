/**
 * Created by Mihnea on 7/8/2015.
 */
var mongoose = require('mongoose');
//var SimulationModel = mongoose.model('Simulation');
var Patient = mongoose.model('Patient');
var Simulation = mongoose.model('Simulation');
var dateformat = require('dateformat');

module.exports = function (app) {

    app.post("/simulate", function (req, res, next) {

        var patient_id = req.body.patient_id;
        var currentSimulation = Simulation.createSimFromReq(req);

        Simulation.create(currentSimulation, function (err, createdSim) {
            if (err) return next(err);
            else console.log('ispravit-o');
            console.log(createdSim._id);
            if(createdSim) {
                var simID = createdSim._id.toString();
                var simCreationDate = dateformat(createdSim.created, "dd.mm.yyyy, hh:MM:ss");

                console.log(simID);
                Patient.update(patient_id,{$push:{simulations:{_id:simID, created:simCreationDate}}}, function(err,result){
                    if(err) return next(err);
                });
            };
        });

        return res.redirect("/patient/"+patient_id);
    });

    app.get("/patient/:id/sim/:simID",function(req,res,next){
        console.log('aici o fost');

        var patientID = req.params.id;
        var simID = mongoose.Types.ObjectId(req.params.simID);

        Patient.findById(patientID).exec(function(err,foundPatient){
           if(err) return next(err);
            var patient = foundPatient;
            Simulation.findById(simID).exec(function(err,foundSimulation) {
                if(err) return next(err);
                if(!foundSimulation) {
                    console.log('no sim found')
                } //404
                var simulation = foundSimulation;
                res.render('simulation.jade', {patient:patient,sim:simulation});
            });
        });
    });




}
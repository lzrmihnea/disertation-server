/**
 * Created by Mihnea on 7/8/2015.
 */
var mongoose = require('mongoose');
//var SimulationModel = mongoose.model('Simulation');
var Patient = mongoose.model('Patient');
var Simulation = mongoose.model('Simulation');

module.exports = function (app) {

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

    app.get("/patient/:id/sim/:simID/delete",function(req,res,next){
        var patientID = req.params.id;
        var simID = mongoose.Types.ObjectId(req.params.simID);

        Simulation.findById(simID, function(err,foundSimulation){
            if(err) return next(err);

            Patient.update(patientID,{$pull:{simulations:{_id:{$eq:simID}}}}, function(err,result){
                if(err) return next(err);
            });

            if(foundSimulation){
                foundSimulation.remove(function(err){
                    if(err) return next(err);

                    // TODO display a confirmation message to user
                })
            }
        })
        return res.redirect("/patient/"+req.params.id);
    });




}
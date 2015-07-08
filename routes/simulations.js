/**
 * Created by Mihnea on 7/8/2015.
 */
var Simulation = require('./../models/simulation.js');
var Patient = require('./../models/patient.js');
var mongoose = require('mongoose');
var SimulationModel = mongoose.model('Simulation');
var PatientModel = mongoose.model('Patient');

module.exports = function (app) {

    app.post("/simulate", function (req, res, next) {

        var patient_id = req.body.patient_id;
        var currentSimulation = createSimulationObject(req);

        PatientModel.update(patient_id,{$push:{simulations:currentSimulation}}, function(err,result){
            if(err) return next(err);
        });

        return res.redirect("/patient/"+patient_id);
    });


    function createSimulationObject(req) {

        var cnp = req.body.patient_id; // sau patient._id;

        var shoulderPos = req.body.shoulderPos;

        var elbowContactPos = req.body.elbowContactPos;
        var handContactPos = req.body.handContactPos;

        var elbowReleasePos = req.body.elbowReleasePos;
        var handReleasePos = req.body.handReleasePos;

        var upperArmMass = req.body.upperArmMass;
        var forearmMass = req.body.forearmMass;
        var handMass = req.body.handMass;
        var subjectMass = req.body.subjectMass;

        var currentSimulation = {
            patient_id: cnp,

            shoulderPos: shoulderPos,

            elbowContactPos: elbowContactPos,
            handContactPos: handContactPos,

            elbowReleasePos: elbowReleasePos,
            handReleasePos: handReleasePos,

            upperArmMass: upperArmMass,
            forearmMass: forearmMass,
            handMass: handMass,
            subjectMass: subjectMass

            //,
            //
            //_id:cnp+shoulderPos+elbowContactPos+handContactPos+elbowReleasePos+handReleasePos+upperArmMass+forearmMass+handMass+subjectMass
        };
        return currentSimulation;
    }

}
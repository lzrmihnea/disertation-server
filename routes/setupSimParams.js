/**
 * Created by Mihnea on 6/14/2015.
 */

var Simulation = require('./../models/simulation.js');
var Patient = require('./../models/patient.js');
var mongoose = require('mongoose');
mongoose.model('Simulation');
mongoose.model('Patient');


module.exports = function (app) {
    // Create
    app.get("/setupSimParams", function (req, res) {
        res.render('setupSimParams.jade');
    });

    app.post("/setupSimParams", function (req, res, next) {

        var cnp = req.body.cnp;
        var lastname = req.body.lastname;
        var firstname = req.body.firstname;
        var address = req.body.address;

        var shoulderPos = req.body.shoulderPos;

        var elbowContactPos = req.body.elbowContactPos;
        var handContactPos = req.body.handContactPos;

        var elbowReleasePos = req.body.elbowReleasePos;
        var handReleasePos = req.body.handReleasePos;

        var upperArmMass = req.body.upperArmMass;
        var forearmMass = req.body.forearmMass;
        var handMass = req.body.handMass;
        var subjectMass = req.body.subjectMass;


        var currentSimulation = createSimulationObject(cnp, shoulderPos, elbowContactPos, handContactPos, elbowReleasePos, handReleasePos, upperArmMass, forearmMass, handMass, subjectMass);

        var patient = createPatientObject(cnp, lastname, firstname, address);


        //Simulation.create(currentSimulation, function (err) {
        //    if (err) {
        //        return next(err);
        //    }
        //
        //    console.log('Added new simulation!');
        //})
        var simId = currentSimulation.shoulderPos + currentSimulation.elbowContactPos +
            currentSimulation.handContactPos + currentSimulation.elbowReleasePos +
            currentSimulation.handReleasePos + currentSimulation.upperArmMass +
            currentSimulation.forearmMass + currentSimulation.handMass +
            currentSimulation.subjectMass;
        Patient.findById(patient, function (err, foundPatient) {
            if (err) {
                return next(err);
            }

            if (foundPatient) {

                Simulation.findById(simId, function (err, foundSim) {
                    if (err) {
                        return next(err);
                    }
                    if (!foundSim) {
                        currentSimulation._id = simId;
                        Simulation.create(currentSimulation, function (err, createdSimulation) {
                            if (err) {
                                return next(err);
                            }
                        });
                    }
                    foundPatient.simulations.push(currentSimulation._id);
                    foundPatient.save();
                    console.log('saved!');
                });
            } else {
                Patient.create(patient, function (err, newPatient) {
                    if (err) {
                        return next(err);
                    }
                    Simulation.create(currentSimulation, function (err, createdSimulation) {
                        if (err) {
                            return next(err);
                        }
                        newPatient.simulations.push(currentSimulation._id);
                        newPatient.save();
                        console.log('saved!');
                    });
                })
            }
            //simId += currentSimulation.patient_id;
            //patient.simulations.push(currentSimulation._id);
        console.log(patient._id);
        });

        return res.redirect('/setupSimParams');
    });


    function createSimulationObject(cnp, shoulderPos, elbowContactPos, handContactPos, elbowReleasePos, handReleasePos, upperArmMass, forearmMass, handMass, subjectMass) {
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
            subjectMass: subjectMass,

            _id:cnp+shoulderPos+elbowContactPos+handContactPos+elbowReleasePos+handReleasePos+upperArmMass+forearmMass+handMass+subjectMass
        };
        return currentSimulation;
    }

    function createPatientObject(cnp, lastname, firstname, address) {
        var patient = {
            _id: cnp,
            name:{first:firstname, last:lastname},
            address: address
        };
        return patient;
    }
};
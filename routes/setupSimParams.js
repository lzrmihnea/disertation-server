/**
 * Created by Mihnea on 6/14/2015.
 */

var Simulation = require('./../models/simulation.js');
var mongoose = require('mongoose');
mongoose.model('Simulation');


module.exports = function (app) {
    // Create
    app.get("/setupSimParams", function (req, res) {
        res.render('setupSimParams.jade');
    });

    app.post("/setupSimParams", function (req, res, next) {

        var shoulderPos = req.body.shoulderPos.split(',');

        var elbowContactPos = req.body.elbowContactPos.split(',');
        var handContactPos = req.body.handContactPos.split(',');

        var elbowReleasePos = req.body.elbowReleasePos.split(',');
        var handReleasePos = req.body.handReleasePos.split(',');

        var upperArmMass = req.body.upperArmMass.split(',');
        var forearmMass = req.body.forearmMass.split(',');
        var handMass = req.body.handMass.split(',');
        var subjectMass = req.body.subjectMass.split(',');

        console.log(shoulderPos);
        var currentSimulation = {
            shoulderPos: shoulderPos,

            elbowContactPos: elbowContactPos,
            handContactPos: handContactPos,

            elbowReleasePos: elbowReleasePos,
            handReleasePos: handReleasePos,

            upperArmMass: upperArmMass,
            forearmMass: forearmMass,
            handMass: handMass,
            subjectMass: subjectMass
        };

        Simulation.create(currentSimulation, function (err, newUser) {
            if (err) {
                return next(err);
            }

            console.log('Added new simulation!');
        })

        return res.redirect('/setupSimParams');
    });

};
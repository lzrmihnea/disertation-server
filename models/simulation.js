var mongoose = require('mongoose');

// Optional: var schema = new mongoose.Schema({
var schema = mongoose.Schema({

    patient_id: {type: Number, index: 1},

    shoulderPos: {type: String},

    elbowContactPos: {type: String},
    handContactPos: {type: String},

    elbowReleasePos: {type: String},
    handReleasePos: {type: String},

    upperArmMass: {type: String},
    forearmMass: {type: String},
    handMass: {type: String},
    subjectMass: {type: String},

    created: {type: Date, default: Date.now}

});

schema.statics.createSimFromReq = function (req, callback) {
    var currentSimulation = {
        patient_id: req.body.patient_id,

        shoulderPos: req.body.shoulderPos,

        elbowContactPos: req.body.elbowContactPos,
        handContactPos: req.body.handContactPos,

        elbowReleasePos: req.body.elbowReleasePos,
        handReleasePos: req.body.handReleasePos,

        upperArmMass: req.body.upperArmMass,
        forearmMass: req.body.forearmMass,
        handMass: req.body.handMass,
        subjectMass: req.body.subjectMass
    };
    return currentSimulation;
};

schema.index({

    patient_id: 1,
    shoulderPos: 1,

    elbowContactPos: 1,
    handContactPos: 1,
    elbowReleasePos: 1,
    handReleasePos: 1,

    upperArmMass: 1,
    forearmMass: 1,
    handMass: 1,
    subjectMass: 1
});

module.exports = mongoose.model('Simulation', schema);
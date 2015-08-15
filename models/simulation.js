var mongoose = require('mongoose');

// Optional: var schema = new mongoose.Schema({
var schema = mongoose.Schema({

    patient_id: {type: Number, index: 1},

    shoulderPos: {type: String, required: true, match:/^(\-?\d+(\.\d+)?),\w*(\-?\d+(\.\d+)?)$/},

    elbowContactPos: {type: String, required: true, match:/^(\-?\d+(\.\d+)?),\w*(\-?\d+(\.\d+)?)$/},
    handContactPos: {type: String, required: true, match:/^(\-?\d+(\.\d+)?),\w*(\-?\d+(\.\d+)?)$/},

    elbowReleasePos: {type: String, required: true, match:/^(\-?\d+(\.\d+)?),\w*(\-?\d+(\.\d+)?)$/},
    handReleasePos: {type: String, required: true, match:/^(\-?\d+(\.\d+)?),\w*(\-?\d+(\.\d+)?)$/},

    upperArmMass: {type: String, required:true, match:/^(\d+(\.\d+)?)$/},
    forearmMass: {type: String, required:true, match:/^(\d+(\.\d+)?)$/},
    handMass: {type: String, required:true, match:/^(\d+(\.\d+)?)$/},
    subjectMass: {type: String, required:true, match:/^(\d+(\.\d+)?)$/},

    created: {type: Date, default: Date.now}

});

schema.statics.createSimFromReq = function (req, patientID, callback) {
    var currentSimulation = {
        patient_id: patientID,

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
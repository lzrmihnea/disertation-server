var mongoose = require('mongoose');

// Optional: var schema = new mongoose.Schema({
var schema = mongoose.Schema({

    patient_id:{type:Number},

    shoulderPos: {type: String},

    elbowContactPos: {type: String},
    handContactPos: {type: String},

    elbowReleasePos: {type: String},
    handReleasePos: {type: String},

    upperArmMass: {type: String},
    forearmMass: {type: String},
    handMass: {type: String},
    subjectMass: {type: String}

});

module.exports = mongoose.model('Simulation', schema);
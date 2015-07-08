var mongoose = require('mongoose');

// Optional: var schema = new mongoose.Schema({
var schema = mongoose.Schema({

    _id:{type:String},

    patient_id:{type:Number, index:1,unique:true},

    shoulderPos: {type: String},

    elbowContactPos: {type: String},
    handContactPos: {type: String},

    elbowReleasePos: {type: String},
    handReleasePos: {type: String},

    upperArmMass: {type: String},
    forearmMass: {type: String},
    handMass: {type: String},
    subjectMass: {type: String},

    created: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Simulation', schema);
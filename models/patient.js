var mongoose = require('mongoose');
var Simulation = mongoose.model('Simulation');

const REGEX_NAME = /^[A-Z][a-zA-Z]+$/;
const REGEX_CNP = /^\d{13}$/;

var schema = mongoose.Schema({
    _id: {
        type:String,
        required: true,
        match: REGEX_CNP
    },
    lastname: {type:String, required: true, match: REGEX_NAME},
    firstname: {type:String, required: true, match:REGEX_NAME},
    address: {type:String},
    created: {type:Date, default:Date.now},
    simulations: [{id: String, created:String}]
});


module.exports = mongoose.model('Patient', schema);
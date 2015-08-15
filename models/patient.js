var mongoose = require('mongoose');
var Simulation = mongoose.model('Simulation');

var schema = mongoose.Schema({
    _id: {
        type:String,
        required: true,
        match:/^\d{13}$/
    },
    lastname: {type:String, required: true, match:/^[A-Z][a-zA-Z]+$/},
    firstname: {type:String, required: true, match:/^[A-Z][a-zA-Z]+$/},
    address: {type:String},
    created: {type:Date, default:Date.now},
    //simulations: [{type:Simulation}]
    //simulations: [{sim :{type: mongoose.Schema.Types.ObjectId, ref: 'Simulation._id'}}]
    simulations: [{id: String, created:String}]
});


module.exports = mongoose.model('Patient', schema);
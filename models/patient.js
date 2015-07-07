var mongoose = require('mongoose');
mongoose.model('Simulation');
var Simulation = require('./simulation.js');

var schema = mongoose.Schema({
    _id: {
        type:String
    },
    name: {first:String, last:String},
    address: {type:String},
    created: {type:Date, default:Date.now},
    //simulations: [{type:Simulation}]
    //simulations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Simulation'}]
    simulations: [{type: String}]
});
module.exports = mongoose.model('Patient', schema);
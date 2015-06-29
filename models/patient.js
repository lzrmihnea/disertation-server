var mongoose = require('mongoose');
mongoose.model('Simulation');

var schema = mongoose.Schema({
    _id: {
        type:String
    },
    name: {first:String, last:String},
    address: {type:String},
    created: {type:Date, default:Date.now},
    simulations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Simulation'}]
});
module.exports = mongoose.model('Patient', schema);
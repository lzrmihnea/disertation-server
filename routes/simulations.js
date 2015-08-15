/**
 * Created by Mihnea on 7/8/2015.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var dateformat = require('dateformat');

var Patient = mongoose.model('Patient');
var Simulation = mongoose.model('Simulation');

module.exports = function (app) {

    app.get("/patient/:id/sim/:simID",function(req,res,next){

        var patientID = req.params.id;
        var simID = mongoose.Types.ObjectId(req.params.simID);

        Patient.findById(patientID).exec(function(err,foundPatient){
           if(err) return next(err);
            var patient = foundPatient;
            Simulation.findById(simID).exec(function(err,foundSimulation) {
                if(err) return next(err);
                if(!foundSimulation) {
                } //404
                var simulation = foundSimulation;
                return res.render('simulation.jade', {patient:patient,sim:simulation});
            });
        });
    });

    app.post("/patient/:id/sim/:simID",function(req,res,next){

        var simID = mongoose.Types.ObjectId(req.params.simID);

        Simulation.findById(simID).exec(function(err,foundSimulation) {
            if(err) return next(err);
            if(!foundSimulation) {
            } //404

            var simJSON = parseSimToJSON(foundSimulation);
            var fileExtension = ".m";
            var jsonFilename = foundSimulation.patient_id + " - " + dateformat(foundSimulation.created, "dd.mm.yyyy, hh-MM-ss")+fileExtension;
            var text={jsonFileContents:JSON.stringify(simJSON)};
            res.set({"Content-Disposition":"attachment; filename=\""+jsonFilename+"\""});
            res.send(text.jsonFileContents);
        });
    });


    app.get("/patient/:id/sim/:simID/delete",function(req,res,next){
        var patientID = req.params.id;
        var simID = mongoose.Types.ObjectId(req.params.simID);

        Simulation.remove({"_id": simID});
        Patient.update({"_id":patientID},{$pull:{simulations:{_id:{$eq:simID}}}}, function(err,result){
            if(err) return next(err);
        });
        return res.redirect("/patient/"+req.params.id);
    });


    function parseSimToJSON(simulation) {
        var simJSON = {
            patient_id: simulation.patient_id,

        // Coordinates
        shoulder_x_coord: parseFloat(simulation.shoulderPos.split(',')[0]),
        shoulder_y_coord: parseFloat(simulation.shoulderPos.split(',')[1]),
        //shoulder_coord: [ shoulder_x_coord, shoulder_y_coord, 0 ],

        elbow_c_x_coord: parseFloat(simulation.elbowContactPos.split(',')[0]),
        elbow_c_y_coord: parseFloat(simulation.elbowContactPos.split(',')[1]),
        //elbow_c_coord: [elbow_c_x_coord, elbow_c_y_coord, 0],

        wrist_c_x_coord: parseFloat(simulation.handContactPos.split(',')[0]),
        wrist_c_y_coord: parseFloat(simulation.handContactPos.split(',')[1]),
        //wrist_c_coord: [ wrist_c_x_coord, wrist_c_y_coord, 0],

        elbow_r_x_coord: parseFloat(simulation.elbowReleasePos.split(',')[0]),
        elbow_r_y_coord: parseFloat(simulation.elbowReleasePos.split(',')[1]),
        //elbow_r_coord: [ elbow_r_x_coord, elbow_r_y_coord, 0],

        wrist_r_x_coord: parseFloat(simulation.handReleasePos.split(',')[0]),
        wrist_r_y_coord: parseFloat(simulation.handReleasePos.split(',')[1]),
        //wrist_r_coord: [ wrist_r_x_coord, wrist_r_y_coord, 0 ],


    //// Lengths
    //    upperArmLength: sqrt((shoulder_x_coord - elbow_c_x_coord)^2 + (shoulder_y_coord - elbow_c_y_coord)^2),
    //    foreArmLength: sqrt((elbow_c_x_coord - wrist_c_x_coord)^2 + (elbow_c_y_coord - wrist_c_y_coord)^2),
    ////% handLength: 0.1944 ;
    //    lowerArmLength: foreArmLength,
    //    handrimRadius: sqrt((wrist_c_x_coord - 0)^2 + (wrist_c_y_coord - 0)^2),

        // Masses
        //massFactor: 1,
        upperArmMass: 1 * simulation.upperArmMass,
        foreArmMass: parseFloat(simulation.forearmMass),
        handMass: parseFloat(simulation.handMass),
        //lowerArmMass: 1 * (foreArmMass + 0*handMass),
        subjectMass: 1 * simulation.subjectMass,

    // Centers of Gravity
        upperArmCGratio: 0.4361,
        foreArmCGratio: 0.43,
        handCGratio: 0.5062,
        lowerArmCGratio: 0.4681
            //,

        //upperArmCG_x: (elbow_c_x_coord) + ((shoulder_x_coord - elbow_c_x_coord) * upperArmCGratio),
        //upperArmCG_y: elbow_c_y_coord + ((shoulder_y_coord - elbow_c_y_coord) * upperArmCGratio),
        //lowerArmCG_x: (elbow_c_x_coord * lowerArmCGratio),
        //lowerArmCG_y: (elbow_c_y_coord * lowerArmCGratio),
        //
        //upperArmCG_coord: elbow_c_coord + ( ( shoulder_coord - elbow_c_coord ) * upperArmCGratio ),
        //lowerArmCG_coord: wrist_c_coord + ( ( elbow_c_coord - wrist_c_coord ) * lowerArmCGratio )


    }
        return simJSON;
    }

}

var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var express = require('express');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.locationsListByDistance = function(req, res) {
    sendJsonResponse(res, 200, {"status": "from Create"} );
};

module.exports.locationsCreate = function(req, res){
    sendJsonResponse(res, 200, {"status": "from Create"} );
};

module.exports.locationsReadOne = function (req, res) {

    if(req.params && req.params.locationid) {


        Loc
            .findById(req.params.locationid)
            .exec(function(err, location){

                if(!location){
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, {
                        "message": err
                    });
                    return;
                }
                sendJsonResponse(res, 200, location);
            });

    } else {
        sendJsonResponse(res, 404, {
            "message" : "No locationid in request"
        });
    }
};

module.exports.locationsUpdateOne = function(req, res, locationsid) {

};

module.exports.locationsDeleteOne = function(req, res, locationsid) {

};
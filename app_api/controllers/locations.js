
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
    sendJsonResponse(res, 200, {"status": "from ReadOne"});
};

module.exports.locationsUpdateOne = function(locationsid) {

};

module.exports.locationsDeleteOne = function(locationsid) {

};
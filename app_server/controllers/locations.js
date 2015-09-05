var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};

if (process.NODE_ENV === 'production') {
    apiOptions.server = "https://young-cliffs-9362.herokuapp.com";
}

var _formatDistance = function (distance) {
    var numDistance, unit;

    if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = ' km';
    } else {
        numDistance = parseInt(distance * 1000, 10);
        unit = ' m';
    }
    return numDistance + unit;
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};


var getLocationInfo = function(req, res, callback){
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            if(response.statusCode === 200){
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};


// GET 'home' page
var renderHomepage = function (req, res, responseBody) {

    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No places found nearby";
        }
    }


    res.render('locations-list', {
        title: 'Loc8r - find a place to wort with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with WIFI near you!'
        },
        locations: responseBody,
        message: message,
        sidebar: 'Loc8r helps you find places to work when out and about.'

    })

};

var renderDetailpage = function (req, res, locDetail) {

    res.render('location-info', {
        title: locDetail,
        pageHeader: {title: locDetail.name},
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please do leave a review to help other people just like you.'
        },
        location: locDetail
    });

};



module.exports.homelist = function (req, res) {
    //renderHomepage(req, res);

    var requestOptions, path;
    path = '/api/locations';

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        //** Carlisle Ave:
        qs: {
            lng: -87.998522,
            lat: 41.994162,
            maxDistance: 2000000000
        }

    };

    request(
        requestOptions,
        function (err, response, body) {

            var i, data;
            data = body;
            if (response.statusCode === 200 && data.length) {
                for (i = 0; i < data.length; i++) {
                    data[i].distance = _formatDistance(data[i].distance);
                }
            }
            renderHomepage(req, res, data);
        }
    );

};


// GET 'Location info' page

module.exports.locationInfo = function (req, res, responseData) {
    renderDetailpage(req, req, responseData);
};

// GET 'Add review' page

module.exports.addReview = function(req, res) {
    getLocationInfo(req, res, function(req, res, responseData){
        renderReviewForm(req, res, responseData);
    })
};


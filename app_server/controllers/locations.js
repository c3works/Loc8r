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

    //res.render('location-info', {
    //    title: 'Location Info',
    //    pageHeader: {title: 'Starcups'},
    //    sidebar: {
    //        context: 'is on Loc8r because it has accessible wifi and space to sid down withyour laptop and get some work done.',
    //        callToAction: 'If you\'ve been here and you like it - or if you don\'t - please leave a review to help other people just like you.'
    //    },
    //    location: {
    //        name: 'Starcups',
    //        address: '125 High Street, READING, RG6 1PS',
    //        rating: 3,
    //        facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
    //        coords: {lat: 51.455041, lng: -0.9690884},
    //        openingTimes: [{
    //            days: 'Monday - Friday',
    //            opening: '7:00am',
    //            closing: '7:00pm',
    //            closed: false
    //        }, {
    //            days: 'Saturday',
    //            opening: '8:00am',
    //            closing: '5:00pm',
    //            closed: false
    //        },{
    //            days: 'Sunday',
    //            closed: true
    //        }],
    //        reviews: [{
    //            author: 'Simon Holmes',
    //            rating: 5,
    //            timestamp: '16 July 2013',
    //            reviewText: 'What a great place. I can\'t say enough good things about it.'
    //        },{
    //            author: 'Charlie Chaplin',
    //            rating: 3,
    //            timestamp: '16 June 2013',
    //            reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
    //        }]
    //    }
    //});
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

module.exports.locationInfo = function (req, res) {

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
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            renderDetailpage(req, res, data)
        }
    );
};

// GET 'Add review' page

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Review Starcups on Loc8r',
        pageHeader: {
            title: 'Review Starcups'
        },
        user: {
            displayName: 'Simon Holmes'
        }
    });
};


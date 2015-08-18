// GET 'home' page

module.exports.homelist = function(req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a place to wort with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading RG6 1PS',
            rating: 3,
            facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
            distance: '100m'
        }, {
            name: 'Cafe Hero',
            address: '456 Cheshire Ave. Bode, 22406',
            rating: 4,
            facilities: ['Hot Drinks', 'Restrooms'],
            distance: '25m'
        }, {
            name: 'Burger Queen',
            address: '56 Hungry Circle, 55882',
            rating: 5,
            facilities: ['Great Food', 'Comfy Chairs', 'Beer'],
            distance: '10m'
        }],
        sidebar: 'Loc8r helps you find places to work when out and about.'
    });
};

// GET 'Location info' page

module.exports.locationInfo = function (req, res) {
    res.render('location-info', {
        title: 'Location Info',
        pageHeader: {title: 'Starcups'},
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sid down withyour laptop and get some work done.',
            callToAction: 'If you\'ve been here and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
            coords: {lat: 51.455041, lng: -0.9690884},
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            },{
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            },{
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};

// GET 'Add review' page

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {title: 'Add review'});
};


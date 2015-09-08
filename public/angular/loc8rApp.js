angular.module('loc8rApp', []);

var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// custom filter - formatting distance
var formatDistance = function(){
    return function (distance) {
        var numDistance, unit;
        if(distance && _isNumeric(distance)){
            if (distance > 1) {
                numDistance = parseFloat(distance).toFixed(1);
                unit = ' mi';
            } else {
                numDistance = parseInt(distance * 1000, 10);
                unit = ' m';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    }
};

//custom directives - star ratings
var ratingStars = function() {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/angular/ratingStars.template.html'
    };
};

var loc8rData = function($http){

    var locationByCoords = function(lat, lng) {
        return $http.get('/api/locations?lng=-88.454289&lat=42.256888&maxDistance=49');
    };

    return {
        locationByCoords : locationByCoords
    };

    //return [{
    //            name: 'Burger Queen',
    //            address: '125 High Street, Reading, RG6 1PS',
    //            rating: 3,
    //            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    //            distance: '0.296456',
    //            _id: '5370a35f2536f6785f8dfb6a'
    //        }];
};

var geolocation = function() {
    var getPosition = function(cbSuccess, cbError, cbNoGeo) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
        } else {
            cbNoGeo();
        }
    };
    return {
        getPosition : getPosition
    };
};

var locationListCtrl = function($scope, loc8rData, geolocation){

    $scope.message = "Checking your location";

    $scope.getData = function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        $scope.message = "Searching for nearby places";
        loc8rData.locationByCoords(lat, lng)
            .success(function(data){
                $scope.message = data.length > 0 ? "" : "No locations found";
                $scope.data = { locations : data };
            })
            .error(function(e){
                $scope.message = "Sorry, something's gone wrong";
                console.log(e);
            });
    };

    $scope.showError = function(error) {
        $scope.$apply(function(){
            $scope.message = error.message;
        })
    };

    $scope.noGeo = function(){
        $scope.$apply(function() {
            $scope.message = "Geolocation not supported by this browser";
        })
    };

    geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);

    //$scope.data = {locations: loc8rData};

   //$scope.data = {
   //         locations:
   //             [{
   //                 name: 'Burger Queen',
   //                 address: '125 High Street, Reading, RG6 1PS',
   //                 rating: 3,
   //                 facilities: ['Hot drinks', 'Food', 'Premium wifi'],
   //                 distance: '0.296456',
   //                 _id: '5370a35f2536f6785f8dfb6a'
   //             },{
   //                 name: 'Costy',
   //                 address: '125 High Street, Reading, RG6 1PS',
   //                 rating: 5,
   //                 facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
   //                 distance: '0.7865456',
   //                 _id: '5370a35f2536f6785f8dfb6a'
   //             },{
   //                 name: 'Cafe Hero',
   //                 address: '125 High Street, Reading, RG6 1PS',
   //                 rating: 0,
   //                 facilities: ['Hot drinks', 'Food', 'Premium wifi'],
   //                 distance: '0.94561236',
   //                 _id: '5370a35f2536f6785f8dfb6a'
   //             },{
   //                 name: 'Starcups',
   //                 address: '125 High Street, Reading, RG6 1PS',
   //                 rating: 1,
   //                 facilities: ['Hot drinks', 'Food', 'Cold drinks'],
   //                 distance: '1.06548',
   //                 _id: '5370a35f2536f6785f8dfb6a'
   //             },{
   //                 name: 'Simon\'s cafe',
   //                 address: '125 High Street, Reading, RG6 1PS',
   //                 rating: 3,
   //                 facilities: ['Hot drinks', 'Food', 'Premium wifi'],
   //                 distance: '2.3654',
   //                 _id: '5370a35f2536f6785f8dfb6a'
   //             },{
   //                 name: 'Sally\'s pub',
   //                 address: '125 High Street, Reading, RG6 1PS',
   //                 rating: 5,
   //                 facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
   //                 distance: '4.213654',
   //                 _id: '5370a35f2536f6785f8dfb6a'
   //             }]
   //     };

};


angular.module('loc8rApp')
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('loc8rData', loc8rData)
    .service('geolocation', geolocation);

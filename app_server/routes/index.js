// ** Modified and commented to switch from express to Angularjs routing

var express =       require('express');
var router =        express.Router();

//var locationCtrl =  require('../controllers/locations');
var otherCtrl =     require('../controllers/other');

//  location pages

router.get('/', otherCtrl.angularApp); // from locationCtrl.locationInfo
//router.get('/location/:locationid', locationCtrl.locationInfo);
//router.get('/location/:locationid/review/new', locationCtrl.addReview);
//router.post('/location/:locationid/review/new', locationCtrl.doAddReview);

//  other pages

//router.get('/about', otherCtrl.about);

module.exports = router;

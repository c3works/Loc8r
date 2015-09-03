var express =       require('express');
var router =        express.Router();

var locationCtrl =  require('../controllers/locations');
var otherCtrl =     require('../controllers/other');


//  location pages

router.get('/', locationCtrl.homelist);
router.get('/locations/:locationid', locationCtrl.locationInfo);
router.get('/locations/review/new', locationCtrl.addReview);

//  other pages

router.get('/about', otherCtrl.about);




module.exports = router;

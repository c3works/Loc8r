var express =       require('express');
var router =        express.Router();

var locationCtrl =  require('../controllers/locations');
var otherCtrl =     require('../controllers/other');


//  location pages

router.get('/', locationCtrl.homelist);
router.get('/location/:locationid', locationCtrl.locationInfo);
router.get('/location/:locationid/review/new', locationCtrl.addReview);

router.post('/location/:locationid/review/new', locationCtrl.doAddReview);

//  other pages

router.get('/about', otherCtrl.about);




module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AirBnB Aid' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'AirBnB Aid - About ABBA' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'AirBnB Aid - Contact' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'AirBnB Aid - Report' });
});


module.exports = router;

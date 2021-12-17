const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'AirBnB Aid - About ABBA' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'AirBnB Aid - Contact' });
});



const legalCheckRouter = require('./legalCheck');
const reportRouter = require('./report');

router.use('/', legalCheckRouter);
router.use('/report', reportRouter);


module.exports = router;
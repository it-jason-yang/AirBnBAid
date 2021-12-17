const express = require('express');
const router = express.Router();
const {imgUpload} = require('../middlewares/imgUpload')

let reportCtrl = require('./controllers/report');
let reportSubmit = reportCtrl.reportSubmit

router.get('/', function(req, res, next) {
    res.render('report', { title: 'AirBnB Aid - Report' });
  });

router.post('/', imgUpload, reportSubmit);

module.exports = router;

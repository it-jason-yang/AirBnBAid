const express = require('express');
const router = express.Router();

let legalCtrl = require('./controllers/legalCheck');
let getLegalResult = legalCtrl.getLegalResult

/* GET users listing. */
// router.get('/legal', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
    res.render('index', { title: 'AirBnB Aid' });
  });
  
router.post('/', getLegalResult);

module.exports = router;

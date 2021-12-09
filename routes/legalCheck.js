var express = require('express');
var router = express.Router();

let legalCtrl = require('./controllers/legalcheck');

let getLegalResult = legalCtrl.getLegalResult

/* GET users listing. */
// router.get('/legal', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', getLegalResult);

module.exports = router;

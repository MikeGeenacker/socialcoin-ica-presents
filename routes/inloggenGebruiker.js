var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var html2jade = require('html2jade');

// var code = qr.image('http://www.youtube.com', {type:'svg'});
// var output = fs.createWriteStream('youtube.svg');

/* GET home page. */
router.get('/', function(req, res, next) {
  var code = qr.imageSync(new Date().toString(), {type : 'svg'});
  res.render('index', { title: 'Express', qrcode : code});
});

module.exports = router;

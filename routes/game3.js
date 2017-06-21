/**
 * Created by tim_h on 21-6-2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('game3');
});

module.exports = router;
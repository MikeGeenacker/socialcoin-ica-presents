var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SocialCoin' });
});

router.post('/', function(req, res, next) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.removeItem('gebruikersnaam');

    var gebruiker = localStorage.getItem('gebruikersnaam');
    console.log(gebruiker);
    res.render('index', { title: 'SocialCoin', gebruiker: gebruiker});
});

module.exports = router;

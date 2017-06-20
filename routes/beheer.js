var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    var gebruiker = localStorage.getItem('gebruikersnaam');

    if(gebruiker !== null) {
        res.render('beheer', { title: 'SocialCoin', gebruiker: gebruiker});
    }
    else    {
        res.redirect('/');
    }

});

router.post('/', function(req, res, next) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('gebruikersnaam', req.body.gebruikersnaam);
    var gebruiker = localStorage.getItem('gebruikersnaam');
    console.log(gebruiker);

    if(gebruiker === 'groep9') {
        res.render('beheer', { title: 'SocialCoin', gebruiker: gebruiker});
    }
    else    {
        res.redirect('/');
    }

});

module.exports = router;

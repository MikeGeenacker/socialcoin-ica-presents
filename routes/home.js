var express = require('express');
var router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function (req, res, next) {

    var account = req.query.account;
    localStorage.setItem('account', account);

    multichain.getAddressBalances({address: account, minconf: 0}, (err, address) => {
        if (err || address.length <= 0 || typeof address == 'undefined')
    {
        res.render('home', {err: 'Wallet bevat geen saldo of wallet bestaat niet.', error: err.message, saldo: 0});
    }
    else
    {
        var saldo = address[0].qty;
        var percentageschuld = parseInt((saldo/50000) *100);
        var percentageschuldgeheel = parseInt((saldo/1000000000000000) *100);
        var saldosocialcoin = parseInt(((saldo) /saldo + 100) *100);
        var resterendeschuld = 50000 - saldo;
        res.render('home', {asset: address[0].name, quantity: address[0].qty, percentage: percentageschuld, percentagegeheel: percentageschuldgeheel, socialcoin: saldosocialcoin, resterend: resterendeschuld});
    }
})
});

module.exports = router;
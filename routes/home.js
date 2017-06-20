var express = require('express');
var router = express.Router();
const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

router.get('/', function (req, res, next) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    var account = req.query.account;
    localStorage.setItem('account', account);

    multichain.getAddressBalances({address: '1BGsLpR4B8AjJV9ox1kpinLThaNoZwAtdC83mf', minconf: 0}, (err, address) => {
        if (err || address.length <= 0 || typeof address == 'undefined')
    {
        res.render('home', {err: 'Wallet bevat geen saldo of wallet bestaat niet.', error: err.message, saldo: 0});
    }
    else
    {
        var saldo = address[0].qty;
        var percentageschuld = parseInt((saldo/100000000000000) *100);
        console.log(address);
        res.render('home', {asset: address[0].name, quantity: address[0].qty, percentage: percentageschuld, editorBody: editorBody});
    }
})
});

module.exports = router;
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

    multichain.getAddressBalances({address: '1BGsLpR4B8AjJV9ox1kpinLThaNoZwAtdC83mf', minconf: 0}, (err, address) => {
        if (err || address.length <= 0 || typeof address == 'undefined')
    {
        res.render('home', {err: 'Wallet bevat geen saldo of wallet bestaat niet.', error: err.message, saldo: 0});
    }
    else
    {
        var verdiendeSocialCoins = 1000000000 - address[0].qty;
        console.log(address);
        res.render('globalHome', {asset: address[0].name, verdiend:verdiendeSocialCoins, totaal: '1000000000'});
    }
})
});

module.exports = router;
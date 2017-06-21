const multichain = require("multichain-node")({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
let gebruiker = localStorage.getItem('account');

let rpc = function() {
    this.sendCoins = function(quantity){
        multichain.sendAsserFrom({
            from: '1BGsLpR4B8AjJV9ox1kpinLThaNoZwAtdC83mf',
            to: gebruiker,
            asset: 'SocialCoin',
            qty: quantity
        }, (err) => {
            if (err){
                console.log(JSON.stringify(err));
                return false;
            }else{
                return true;
            }
        });
    }
};

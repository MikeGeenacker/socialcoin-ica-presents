const express = require('express');
const router = express.Router();
const qr = require('qr-image');
const html2jade = require('html2jade');
const multichain = require('multichain-node')({
    port: 7348,
    host: '136.144.155.184',
    user: "multichainrpc",
    pass: "uPc6civWyGanmrmAgn3Tn9pPgYR3noMQt9nPMun9GeD"
});

// var code = qr.image('http://www.youtube.com', {type:'svg'});
// var output = fs.createWriteStream('youtube.svg');

/* GET home page. */
router.get('/', function(req, res, next) {
  multichain.getNewAddress((err, addressInfo) => { //create new address
    if (err) throw err;
    let address = addressInfo;
    let permission = "connect,receive";
    multichain.grant({addresses: address, permissions: permission}, (err) => { //set address permissions
      if (err) throw err;
      let code = qr.imageSync("http://136.144.155.184/home?account=" + address, {type : 'svg'});
      res.render('walletAanmaken', {address: addressInfo, permission: permission, qrcode : code}); //show created address and permissions
    });

  });
});

module.exports = router;

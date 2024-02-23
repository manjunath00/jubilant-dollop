var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

const remoteAddress = req.socket.remoteAddress
const remotePort = req.socket.remotePort
const localAddress = req.socket.localAddress
const localPort = req.socket.localPort

const details = { "repoName": "cr1", remoteAddress, remotePort, localAddress, localPort}
    res.send(details);
});
module.exports = router;

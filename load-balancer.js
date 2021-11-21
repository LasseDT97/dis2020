const http = require('http');
const httpProxy = require('http-proxy');
const seaport = require('seaport');
const HOST = 'localhost';
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
//creating port
const PORT = 8080;
// Seaport stores host, port and other metadata.
const connect = seaport.connect('localhost', 9090);

var i = - 1;

const certificate = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    secure: false
};

// Creates proxy server with specified options
var proxy = httpProxy.createProxyServer({secure: false});
/* Callback function that connects to server.js file and checks if the server
does not have a lenght property and therefore no server is available*/
var server = https.createServer(certificate, function(req, res) {
    //Nedenstående bliver automatisk gemt som et array.
    var addresses = connect.query('server');
    if (!addresses.length) {
        res.end('Server fejlede');
};

/* Dont quite understand this yet but it's something where the we get the address
split by host and port to use it as target */
i = (i + 1) % addresses.length;
var host = addresses[i].host.split(":").reverse()[0];
var port = addresses[i].port;
proxy.web(req, res, { target: 'https://' + host + ':' + port });
});

server.listen(PORT, function() {
 console.log('loadbalancer listening')
});
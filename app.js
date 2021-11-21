const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const seaport = require('seaport');

const seaportObject = seaport.connect('localhost', 9090);

//Added JSON Body-parser
app.use(bodyParser.json());

//Import account routes
const accountRoute = require('./routes/accounts')
app.use('/accounts', accountRoute)

//Import client routes
const clientRoute = require('./routes/clients');
const db = require('./database/db');
const { MongooseDocument } = require('mongoose');
app.use('/clients', clientRoute)

//index route
app.use('/', (req, res) =>{
    res.send('Welcome to the banking app');
});

//Create server with the https key and certificate
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

//Start listening
let port = seaportObject.register('server');

sslServer.listen(port, () => {
    db.getConnection().then(() => console.log('Server is listening on: ' + port));
});
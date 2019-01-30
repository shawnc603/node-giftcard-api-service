require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('_utils/basic-auth');
const errorHandler = require('_utils/error-handler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);


app.use(function (req, res, next) {
    // set some useful variables if we want to use thems
    global.process_hrtime = process.hrtime();
    global.transactionStart = Date.now();
    // Website you wish to allow to connect
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    //THis header will give browsers ability to read header while do cors
    res.setHeader('Access-Control-Expose-Headers', 'access-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});



app.get('/', function (req, res) {
    res.send("Hello from the Mock Giftcard API");
});

// api routes
//http://localhost:4000/user/
//http://localhost:4000/giftcard/api/v1/
//http://localhost:4000/giftcard/api/v1/company/1/cards/12345
//http://localhost:4000/giftcard/api/v1/company/1/cards/12345/redemptions
app.use('/user', require('./user/user.controller'));
app.use('/giftcard/api/v1/', require('./giftcard/giftcard.controller'));


// global error handler
app.use(errorHandler);

// start server
const port =  4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
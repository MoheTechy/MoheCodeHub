'use strict';
var express = require('express'); 
var bodyParser = require('body-parser');  
var path = require('path');
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

//var busboyBodyParser = require('busboy-body-parser');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.normalize(__dirname + '/../..'), 'www')));
app.set('appPath', 'www');
//app.use(busboyBodyParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Cache-Control', 'no-cache');
    next();
});
// require('./morgan.js')(app);
// require('./routes.js')(app);
require('./morgan')(app);
require('./routes')(app);

exports.app = app;
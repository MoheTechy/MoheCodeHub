'use strict';

var config = require('../config/environment');
var morgan = require('morgan');
var fs = require('fs')
var logger = require('morgan');
var path = require('path');
//var mongoMorgan = require('mongo-morgan');

module.exports = function (app) {
    if (config.morgon.showInConsole) {
        app.use(morgan('combined'));             
    }    
};

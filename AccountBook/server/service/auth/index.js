'use strict';
var express = require('express');
var router = express.Router();

var auth = require('./auth');
var navList = require('./navList');

router.post('/validUser', auth.authenticate);
router.get('/navList/:loginId', navList.userNavList);

module.exports = router;
'use strict';
var express = require('express');
var router = express.Router();

var read = require('./account.read');
var create = require('./account.create');
var edit = require('./account.update');
var remove = require('./account.delete');

router.get('/getAccountHeads', read.getAccountHeads);
router.get('/getAccounts', read.getAccounts);
router.get('/getAccountByID/:id', read.getAccountByID);
router.get('/getVehicles', read.getVehicles);

router.post('/addAccount', create.createAccount);
router.post('/updateAccount', edit.updateAccountByID);
router.post('/deleteAccount', remove.deleteAccountByID);

module.exports = router;
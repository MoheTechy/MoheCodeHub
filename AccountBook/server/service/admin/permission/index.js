'use strict';
var express = require('express');
var router = express.Router();

var read = require('./permission.read');
var edit = require('./permission.delete');
var create = require('./permission.create');

router.get('/', read.index);
router.get('/userRolePermission/:id', read.userRolePermission);
router.get('/:roleId', read.indexById);

router.post('/delete',edit.index);
router.post('/insert', create.index);

module.exports = router;
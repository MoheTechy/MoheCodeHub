'use strict';
var express = require('express');
var router = express.Router();

var read = require('./read.master');
var create = require('./create.master');
var edit = require('./update.master');
var remove = require('./delete.master');

//reading masters
router.get('/getVehicles', read.getVehicles);
router.get('/getExpenses', read.getExpenses);
router.get('/getIncomeBills', read.getIncomeBills);
router.get('/getStaffs', read.getStaffs);
router.get('/getVehicleyID/:id', read.getVehicleByID);
router.get('/getIncomeBillByID/:id', read.getIncomeBillsByID);
router.get('/getExpenseByID/:id', read.getExpenseByID);
router.get('/getStaffByID/:id', read.getStaffByID);
router.get('/getExpenseHeads', read.getExpensesHeads);
router.get('/getStaffByType/:staffType', read.getStaffByType);

//insert masters
router.post('/addVehicle', create.createVehicle);
router.post('/addExpense', create.createExpense);
router.post('/addInomeBill', create.createIncomeBill);
router.post('/addStaff', create.createStaff);

//update masters
router.post('/updateVehicle', edit.updateVehicle);
router.post('/updateExpense', edit.updateExpense);
router.post('/updateIncomeBill', edit.updateIncomeBill);
router.post('/updateStaff', edit.updateStaff);

//delete masters
router.post('/deleteVehicle', remove.deleteVehicle);
router.post('/deleteExpense', remove.deleteExpense);
router.post('/deleteIncomeBill', remove.deleteIncomeBill);
router.post('/deleteStaff', remove.deleteStaff);

module.exports = router;
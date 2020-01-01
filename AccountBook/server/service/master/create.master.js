'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.createVehicle = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("insert into vehicle(vehicle) values(:vehicle);", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.createIncomeBill = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("insert into incomeBill(billEntry, others) values(:billEntry, :others);", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.createExpense = async function(req, res) {
      var replacements = req.body;
      try{
            const billNo = await Sequelize.query('select count(*) as count from expenses where isActive = 1 and billNo = :billNo', { replacements: replacements, type: Sequelize.QueryTypes.SELECT });
            if (billNo[0].count > 0) {
                  var result = {status: 409, msg: 'Already Bill Number Added!' };
                  res.send(result);
            } else {
                  var response = await Sequelize.query("insert into expenses(expenseType, others, billNo, billDate, amount, rawMeterials, expenseDate, companyName, vehicle, staff, staffType, bunkDetails, miscellenious) values(:expenseType, :others, :billNo, :billDate, :amount, :rawMaterials, :expenseDate, :companyName, :vehicle, :staffName, :staffType, :bunkDetails, :miscDesc);", {replacements: replacements});
                  var result = {status: 200, response};
                  res.send(result);
            }
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.createStaff = async function(req, res) {
      var replacements = req.body;
      console.log(replacements);
      try{
            var response = await Sequelize.query("insert into officeStaffs(staffType, staffName, dob, street, city, state, pincode, contact) values(:staffType, :staffName, :dob, :street, :city, :state, :pincode, :contact);", {replacements: replacements});
            var result = {status: 200, msg: 'Added Successfully!'};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, msg: 'Error While Saving!'};
            res.send(result);
      }
}
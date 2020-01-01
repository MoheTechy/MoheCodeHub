'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.updateVehicle = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update vehicle set vehicle = :vehicle where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.updateIncomeBill = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update incomeBill set billEntry = :billEntry where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.updateExpense = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update expenses set expenseType = :expenseType where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.updateStaff = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update officeStaffs set staffType = :staffType, staffName = :staffName, dob = :dob, street = :street, city = :city, state = :state, pincode = :pincode, contact = :contact where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}
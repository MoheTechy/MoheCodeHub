'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.deleteVehicle = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update vehicle set isActive = 0 where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.deleteIncomeBill = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update incomeBill set isActive = 0 where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.deleteExpense = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update expenses set isActive = 0 where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}

exports.deleteStaff = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update officeStaffs set isActive = 0 where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}
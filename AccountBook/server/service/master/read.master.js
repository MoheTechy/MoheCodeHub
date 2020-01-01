'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.getVehicles = async function(req, res) {
      console.log(req.body);
      try{
            let sql = "select * from vehicle where isActive = 1;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getVehicleByID = async function(req, res) {
      var replacements = { id: req.params.id };
      try{
            let sql = "select * from vehicle where isActive = 1 and id = :id;";
            let result = await Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getIncomeBills = async function(req, res) {
      console.log(req.body);
      try{
            let sql = "select * from incomeBill where isActive = 1;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getIncomeBillsByID = async function(req, res) {
      var replacements = { id: req.params.id };
      try{
            let sql = "select * from incomeBill where isActive = 1 and id = :id;";
            let result = await Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getExpenses = async function(req, res) {
      console.log(req.body);
      try{
            // let sql = "select * from expenses where isActive = 1;";
            const sql = 'select a.id, b.expenseHead, a.billNo, a.billDate, a.rawMeterials, a.expenseDate, a.amount, a.companyName, a.vehicle, a.staffType, c.staffName, d.vehicle from expenses a JOIN expensehead b ON a.expenseType = b.id LEFT JOIN officestaffs c ON a.staff = c.id LEFT JOIN vehicle d ON a.vehicle = d.id where a.isActive = 1;';
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getExpenseByID = async function(req, res) {
      var replacements = { id: req.params.id };
      try{
            let sql = "select * from expenses where isActive = 1 and id = :id;";
            let result = await Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getStaffs = async function(req, res) {
      console.log(req.body);
      try{
            let sql = "select * from officeStaffs where isActive = 1;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getStaffByID = async function(req, res) {
      var replacements = { id: req.params.id };
      try{
            let sql = "select * from officeStaffs where isActive = 1 and id = :id;";
            let result = await Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getExpensesHeads = async function(req, res) {
      console.log(req.body);
      try{
            let sql = "select * from expenseHead where isActive = 1;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getStaffByType = async function(req, res) {
      var replacements = { staffType: req.params.staffType };
      try{
            let sql = "select * from officeStaffs where isActive = 1 and staffType = :staffType;";
            let result = await Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}



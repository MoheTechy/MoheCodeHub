'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.getAccountHeads = async function(req, res) {
      console.log(req.body);
      try{
            let sql = "select * from accountHeads;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getAccounts = async function(req, res) {
      console.log(req.body);
      try{
            let sql = "select a.id, b.capital, c.vehicle, d.billEntry, e.expenseType, a.others, a.createdBy, a.amount, a.createdDate, a.updatedBy, a.updatedDate from accounts a left join accountHeads b on a.capitalId = b.id left join vehicle c on a.vehicleId = c.id left join incomeBill d on a.billId = d.id left join expenses e on a.expenseId = e.id where a.isActive = 1 order by a.id desc;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});

            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getAccountByID = async function(req, res) {
      console.log(req.body);
      var replacements = { id: req.params.id };
      try{
            let sql = "select * from accounts where id = :id;";
            let result = await Sequelize.query(sql, {replacements: replacements, type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}

exports.getVehicles = async function(req, res) {
      
      try{
            let sql = "select distinct vehicle from accounts;";
            let result = await Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
            var records = {status: 200, result};
            res.send(records);
      }catch(err){
            console.log(err);
            var records = {status: 500, err};
            res.send(records);
      }
}
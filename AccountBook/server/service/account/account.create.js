'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.createAccount = async function(req, res) {
      var replacements = req.body;
      try{
            let sql = "insert into accounts(capitalId, vehicleId, billId, expenseId, others, amount, createdBy) values(:capitalId, :vehicleId, :billId, :expenseId, :others, :amount, :createdBy);";
            var response = await Sequelize.query(sql, {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}
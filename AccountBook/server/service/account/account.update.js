'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.updateAccountByID = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update accounts set capitalId = :capitalId, vehicleId = :vehicleId, billId = :billId, expenseId = :expenseId, amount = :amount, others = :others where id = :id;", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}
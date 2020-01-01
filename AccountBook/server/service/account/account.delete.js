'use strict';
var Sequelize = require('../../config/sequelize').getConnection();

exports.deleteAccountByID = async function(req, res) {
      var replacements = req.body;
      try{
            var response = await Sequelize.query("update accounts set isActive = 0 where id = :id", {replacements: replacements});
            var result = {status: 200, response};
            res.send(result);
      }catch(err){
            console.log(err);
            var result = {status: 500, err};
            res.send(result);
      }
}
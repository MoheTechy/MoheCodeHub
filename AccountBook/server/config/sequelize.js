'use strict';

var Sequelize = require('sequelize');
var config = require('./environment');

var connection;

init();

function init() {
      try{
            connection = new Sequelize( config.database, config.user, config.pwd,{
                  dialect: 'mysql'
            });
      } catch (ex) {
            console.log(ex);
      }
}

exports.getConnection = function () {
      
      if(connection == undefined || connection == null){
            init();
      }
      
      return connection;
}


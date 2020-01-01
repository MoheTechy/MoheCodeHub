'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('../config/sequelize').getConnection();
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    {
        usernameField : 'loginId',
        passwordField : 'password'
    },

    function (loginId, password, done) {
      
      let replacements = { loginId: loginId};
      Sequelize.query('SELECT * FROM users WHERE loginId = :loginId', { replacements: replacements, type: Sequelize.QueryTypes.SELECT }).then(function (res, err) {
            if(!res.length){
                  var result = { status: 500, message: 'User account not found!'};
                  return done(result);
            }else{
                  var result = { status: 200, data: res};
                  return done(result);
            }
        });
    })
); 

var hashPwd = function (pwd) {
    var data = {
        salt: '',
        passwordHash: ''
    };
    var salt = bcrypt.genSaltSync(10);
    console.log(salt);
    var hash = bcrypt.hashSync(pwd, salt);
    console.log(hash);
    data.salt = salt;
    data.passwordHash = hash;
    return data;
}

exports.saltHashPassword = function (userpassword) {
    var data = hashPwd(userpassword);
    console.log('after return:' + data.passwordHash);
    return data;
}
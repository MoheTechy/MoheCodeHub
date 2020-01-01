'use strict';

var jwt = require('jsonwebtoken');
var passport = require('passport');
var bcrypt = require('bcrypt');
var Sequelize = require('../../config/sequelize').getConnection();

exports.authenticate = function(req, res, next) {

      console.log(req.body);      
      const user = {
          user: req.body.loginId,
          pwd: req.body.password
      }

      passport.authenticate('local', (result) => {
            // console.log(result);
            if(result.status == 200){
                  var hashed = result.data[0]['password'];
                  var isLocked = result.data[0]['isLocked'];
                  var isActive = result.data[0]['isActive'];
                  var userId = result.data[0]['id'];
                  console.log(userId);
                  var isVerified = verify(hashed, user.pwd);                  
                  if(isLocked){
                        res.status(500);
                        res.send({statusBool: false, message: 'User account locked, Please contact admin!'});
                        return; 
                  }
                  if(!isActive){
                        res.status(500);
                        res.send({statusBool: false, message: 'User account deactivated!'});
                        return; 
                  }
                  if(!isVerified){
                        res.status(500);
                        res.send({statusBool: false, message: 'Incorrect password!'});
                        setFailueCount(1, user.user);
                        return;
                  }else{
                        var token = jwt.sign(user, 'JWT-security-key-Mohe');
                        var replacements = { userId : userId };
                        let sql = "select a.permissionId, a.isRead, a.isWrite, b.module, b.name from rolespermission a left outer join permission b on a.permissionId = b.id where a.isActive = 1 and a.roleId in (select roleId from userroles where isActive = 1 and userId = :userId)";

                        Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT })
                        .then(recrds => {
                              console.log(recrds);
                              res.status(200);
                              res.send({statusBool: true, message: 'Succeddfully LoggedIn!', token: token, permission: recrds});
                              setFailueCount(0, user.user);
                              return;
                        });                        
                  }

            }else{
                  res.send(result);
            }
      })(req, res, next);
}

var verify = function (hash, pwd) { 
      var result = bcrypt.compareSync(pwd, hash); //Boolean
      return result;
}

var setFailueCount = function(count, loginId) {

      var replacements = { count: count, loginId: loginId };

      if(count){
            Sequelize.query('select failurecount from users where loginId = :loginId',{replacements: replacements, type: Sequelize.QueryTypes.SELECT })
            .then(res => {
                  console.log(res);
                  var failurecount = res[0]['failurecount'] + 1;
                  if(failurecount >= 3){
                        var replacements1 = { count: failurecount, loginId: loginId };
                        Sequelize.query('update users set isLocked = 1, failurecount = :count where loginId = :loginId',{replacements: replacements1})
                        .then(res => {
                              console.log('User locked!');
                        });
                  }else{
                        var replacements2 = { count: failurecount, loginId: loginId };
                        Sequelize.query('update users set failurecount = :count where loginId = :loginId',{replacements: replacements2})
                        .then(res => {
                              console.log('User failurecount incremented!');
                        });                       
                  } 
            });      
      }else{
            Sequelize.query('update users set failurecount = :count where loginId = :loginId',{replacements: replacements})
            .then(res => {
                  console.log('User failurecount reseted!');
            });
      }
}

var getUserRoles = function(userId) {

      var replacements = { userId : userId };

      
      return result;
}
'use strict';
var passport = require('../../../config/passport');
var Sequelize = require('../../../config/sequelize').getConnection();
var generator = require('generate-password');
var mailer = require('../../users/userEmail');
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var password = generator.generate({
            length: 10,
            numbers: true
        });
        var roleIdx = 0;
        var replacements = req.body;
        var passwordData = passport.saltHashPassword(password);
        replacements.password = passwordData.passwordHash;
        console.log('Original password --------------');
        console.log(password);
        replacements.salt = passwordData.salt;
        replacements.pwd = password;
        replacements.createdBy = "Admin";
        replacements.createdDate = formatDate();

        Sequelize
            .query('SELECT count(*) as count FROM users WHERE LOWER(loginId) = LOWER(:loginId) AND isActive = 1;', {replacements: replacements, type: Sequelize.QueryTypes.SELECT})
            .then( response => {
                if(!response[0].count){
                    Sequelize
                        .query('SELECT count(*) as count FROM users WHERE LOWER(emailId) = LOWER(:emailId) AND isActive = 1;', {replacements: replacements, type: Sequelize.QueryTypes.SELECT})
                        .then( response1 => {
                            if(!response1[0].count){
                                Sequelize
                                    .query('SELECT count(*) as count FROM users WHERE LOWER(contactNumber) = LOWER(:contactNumber) AND isActive = 1;', {replacements: replacements, type: Sequelize.QueryTypes.SELECT})
                                    .then( response2 => {
                                        if(!response2[0].count){

                                            Sequelize
                                                .query('select max(id) as id from users where isActive = 1;',{type: Sequelize.QueryTypes.SELECT})
                                                .then( response4 => {
                                                    console.log(response4);
                                                    replacements.id = parseInt(response4[0].id) + 1;
                                                    Sequelize
                                                        .query('INSERT INTO users(id, loginId, name, emailId, contactCode, contactNumber, salt, password, createdBy, createdDate) VALUES(:id, :loginId, :name, :emailId, :contactCode, :contactNumber, :salt, :password, :createdBy, :createdDate);', {replacements: replacements, type: Sequelize.QueryTypes.SELECT})
                                                        .then( response3 => {
                                                            console.log(response3);
                                                            var returnVal = {
                                                                statusBool: 200,
                                                                statusText: "User saved successfully"
                                                            };
                                                            res.send(returnVal);
                                                        });
                                                });
                                        }else{
                                            var returnVal = {
                                                statusBool: 400,
                                                statusText: 'Mobile already exists'
                                            };
                                            res.send(returnVal);
                                        }
                                    });
                            }else{
                                var returnVal = {
                                    statusBool: 400,
                                    statusText: 'Email id already exists'
                                };
                                res.send(returnVal);
                            }
                        });
                }else{
                    var returnVal = {
                        statusBool: 400,
                        statusText: 'Login id already exists'
                    };
                    res.send(returnVal);
                }
            });
        // Sequelize
        //     .query('EXEC CreateUser :loginId,:name, :emailId,:contactCode,:contactNumber,:salt, :password,:createdBy', { replacements: replacements1 })
        //     .then(onSuccess);

        // function onSuccess(recs) {
        //     var userId = recs[0][0].id;
        //     if (userId == -1) {
        //         var returnVal = {
        //             statusBool: - 1,
        //             statusText: 'Login id already exists'
        //         };
        //         res.send(returnVal);
        //     }
        //     else if (userId == -2) {
        //         var returnVal = {
        //             statusBool: -2,
        //             statusText: 'Email id already exists'
        //         };
        //         res.send(returnVal);
        //     } 
        //     else if (userId == -3) {
        //         var returnVal = {
        //             statusBool: -3,
        //             statusText: 'Mobile already exists'
        //         };
        //         res.send(returnVal);
        //     }
        //     else {
        //         var userRole = replacements1.role;
        //         userRole.forEach(roleId => {
        //             var roleId = roleId.id;
        //             var replacements = {
        //                 userId: userId,
        //                 roleId: roleId,
        //                 createdBy: req.body.createdBy
        //             }

        //             Sequelize
        //                 .query('EXEC InsertUserRoles :userId, :roleId,:createdBy', { replacements: replacements })
        //                 .then(queryReturn);
        //         });
        //     }
        // };

        // function queryReturn(recs) {
        //     roleIdx = roleIdx + 1;
        //     var returnVal = {
        //         statusBool: 1,
        //         statusText: "User saved successfully"
        //     };
        //     // mailer.sendEmail(replacements1);
        //     userMail(replacements1);
        //     if (replacements1.role.length == roleIdx) {
        //         res.send(returnVal);
        //     }
        // };

        // function userMail(replacements1) {
        //     Sequelize
        //         .query('EXEC Add_mailsQueue :emailId, :pwd', { replacements: replacements1 })
        //         .then(queryReturn);

        //     function queryReturn(recs) {
        //         console.log(recs);
        //     }
        // }
    }
};

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
'use strict';

var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var roleIdx = 0;
        var replacements1 = {
            id: req.body.id,
            loginId: req.body.loginId,
            name: req.body.name,
            emailId: req.body.emailId,
            contactCode: req.body.contactCode,
            contactNumber: req.body.contactNumber,
            updatedBy: req.body.updatedBy,
            role: req.body.role
        }

        Sequelize
            .query('EXEC UpdateUser :id,:loginId,:name,:emailId,:contactCode,:contactNumber,:updatedBy',
                { replacements: replacements1 })
            .then(onSuccess);

        function onSuccess(recs) {
            var userId = recs[0][0].id;
            if (userId == -1) {
                var returnVal = {
                    statusBool: - 1,
                    statusText: 'Login Id already exists'
                };
                res.send(returnVal);
            }
            else if (userId == -2) {
                var returnVal = {
                    statusBool: -2,
                    statusText: 'Email Id already exists'
                };
                res.send(returnVal);
            }
            else if (userId == -3) {
                var returnVal = {
                    statusBool: -3,
                    statusText: 'Mobile already exists'
                };
                res.send(returnVal);
            }
            else {

                Sequelize
                    .query('EXEC DeleteUserRole :id',
                        { replacements: replacements1 })
                    .then(onDeleteSuccess);

                function onDeleteSuccess(recs) {
                    var userRole = replacements1.role;
                    var updatedBy = replacements1.updatedBy;
                    userRole.forEach(roleId => {
                        console.log(recs);
                        var userId = replacements1.id;
                        var roleId = roleId.id;
                        var userName = updatedBy;

                        var replacements = {
                            userId: userId,
                            roleId: roleId,
                            userName: userName,
                        }

                        Sequelize
                            .query('EXEC UpdateUserRoles :userId,:roleId,:userName',
                                { replacements: replacements })
                            .then(queryReturn);
                    });

                }
            }
        };

        function queryReturn(recs) {
            roleIdx = roleIdx + 1;
            if (replacements1.role.length == roleIdx) {
                var returnVal = {
                    statusBool: 1,
                    statusText: 'User updated successfully'
                };
                res.send(returnVal);
            }
        };
    }
};



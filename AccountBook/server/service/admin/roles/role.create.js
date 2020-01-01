'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {
        
        var totLength = 0;
        var replacements1 = {
            name: req.body.roleName,
            description: req.body.roleDescription,
            createdBy: req.body.createdBy
        };

        Sequelize
            .query('EXEC CreateRole :name, :description, :createdBy', { replacements: replacements1 })
            .then(onSuccess);

        function onSuccess(recs) {
            var roleId = recs[0][0].id;
            if (roleId == -1) {
                var returnVal = {
                    statusBool: -1,
                    statusText: 'Role already exists'
                };
                res.send(returnVal);
            } else {
                var userRole = req.body.rolesPermissionData;
                userRole.forEach(permissionId => {
                    if (permissionId.isRead == undefined) {
                        permissionId.isRead = false
                    }
                    if (permissionId.isWrite == undefined) {
                        permissionId.isWrite = false
                    }
                    var roleId = recs[0][0].id;
                    var replacements = {
                        roleId: roleId,
                        permissionId: permissionId.id,
                        isRead: permissionId.isRead,
                        isWrite: permissionId.isWrite,
                        createdBy: req.body.createdBy
                    }
                    Sequelize
                        .query('EXEC InsertRolePermission :roleId, :permissionId,:isRead,:isWrite,:createdBy', { replacements: replacements })
                        .then(queryReturn);
                });
            }
        };

        function queryReturn(recs) {
            totLength = totLength + 1;
            var returnVal = {
                statusBool: 1,
                statusText: "Role added successfully"
            };
            if (req.body.rolesPermissionData.length == totLength) {
                res.send(returnVal);
            }
        };
    }
};

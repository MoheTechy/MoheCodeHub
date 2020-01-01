'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);
    if (callfn) {

        var totLength = 0;
        var replacements1 = {
            module: req.body.module,
            name: req.body.name,
            createdBy: req.body.createdBy
        };

        Sequelize
            .query('EXEC CreatePermission :module, :name, :createdBy', { replacements: replacements1 })
            .then(onSuccess);

        function onSuccess(recs) {
            var roleId = recs[0][0].id;
            if (roleId == -1) {
                var returnVal = {
                    statusBool: -1,
                    statusText: 'Module and name already exists'
                };
                res.send(returnVal);
            } else {
                var userRole = recs[0];
                userRole.forEach(roleId => {
                    if (roleId.roleId != undefined) {
                        var permissionId = recs[0][0].id;
                        var replacements = {
                            permissionId: permissionId,
                            roleId: roleId.roleId,
                            createdBy: req.body.createdBy
                        }
                        Sequelize
                            .query('EXEC InsertRolePermissionByPermission :roleId, :permissionId,:createdBy', { replacements: replacements })
                            .then(queryReturn);
                    }
                });
            }
        };
        
        function queryReturn(recs) {
            totLength = totLength + 1;
            var returnVal = {
                statusBool: 1,
                statusText: "Permission added successfully"
            };
            if (!recs[0].length == totLength) {
                res.send(returnVal);
            }
        };
    }
};

'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.indexById = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var replacements1 = {
            roleId: req.params.roleId
        };

        Sequelize
            .query('EXEC GetPermissionByRoleId :roleId',
                { replacements: replacements1 })
            .then(queryReturn);

        function queryReturn(recs) {
            res.send(recs[0]);
        };
    }
};

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        Sequelize
            .query('EXEC GetAllPermissions ')
            .then(queryReturn);

        function queryReturn(recs) {
            res.send(recs[0]);
        };
    }
};

exports.userRolePermission = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {
        var replacements1 = {
            id: req.params.id
        };

        Sequelize
            .query('EXEC GetUserRolePermission :id',
                { replacements: replacements1 })
            .then(queryReturn);

        function queryReturn(recs) {
            res.send(recs[0]);
        };
    }
};

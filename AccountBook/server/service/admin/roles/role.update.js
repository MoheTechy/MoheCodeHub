'use strict';

var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {
    console.log(req.body);

    var replacements1 = {
        id: req.body.id,
        name: req.body.roleName,
        description: req.body.roleDescription,
        updatedBy: req.body.updatedBy
    };

    Sequelize
        .query('EXEC UpdateRole :id, :name, :description, :updatedBy',
            { replacements: replacements1 })
        .then(queryReturn);

    function queryReturn(recs) {
        var id = recs[0][0].id;
        if (id == -1) {
            var returnVal = {
                statusBool: -1,
                statusText: 'Role already exists'
            };
            res.send(returnVal);
        }
        else {
            var returnVal = {
                statusBool: 1,
                statusText: 'Role updated successfully'
            };
            res.send(returnVal);
        }
    };
};

exports.rolePermission = function (req, res) {
    console.log(req.body);

    var replacements1 = req.body;

    Sequelize
        .query('EXEC UpdateRolePermission :id, :isRead, :isWrite',
            { replacements: replacements1 })
        .then(queryReturn);

    function queryReturn(recs) {

        // res.send(recs[0]);
        res.send(JSON.stringify("Updated Successfully!"));
    };
};
'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);
    if (callfn) {
        var replacements1 = {
            id: req.body.id,
            updatedBy: req.body.updatedBy
        }

        Sequelize
            .query('EXEC DeletePermission :id,:updatedBy',
                { replacements: replacements1 })
            .then(queryReturn);

        function queryReturn(recs) {
            var returnVal = {
                statusBool: 1,
                statusText: 'Permission deleted successfully'
            };
            res.send(returnVal);
        };
    }
};
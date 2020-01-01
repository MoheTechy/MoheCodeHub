'use strict';

var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var sql = 'SELECT * FROM users WHERE isActive = 1';

        Sequelize.query(sql).then(queryReturn);

        function queryReturn(recs) {
            console.log(recs);
            res.send(recs[0]);
        };
    }
};

exports.indexById = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var replacements1 = {
            id: req.params.id
        };

        var sql = 'SELECT id, loginId, name, emailId, contactCode, contactNumber, isLocked, isActive, failureCount, lastLoginTime, createdBy, createdDate, updatedBy, updatedDate FROM users WHERE id = :id AND isActive = 1;'

        Sequelize
            .query(sql,{ replacements: replacements1, type: Sequelize.QueryTypes.SELECT })
            .then(queryReturn);

        function queryReturn(recs) {
            res.send(recs[0]);
        };
        
    }
};

exports.indexByLoginId = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var replacements1 = {
            LoginId: req.params.LoginId
        };

        Sequelize
            .query('EXEC  GetUserRoles :LoginId',
                { replacements: replacements1 })
            .then(queryReturn);

        function queryReturn(recs) {
            console.log('inside master user..');
            res.send(recs[0]);
        };
    }
};


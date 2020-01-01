'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');


exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var sql = 'SELECT id, name, description, isActive, createdBy, createdDate, updatedBy, updatedDate FROM roles WHERE isActive = 1;';

        Sequelize
            .query(sql)
            .then(queryReturn);

        function queryReturn(recs) {
            // console.log(recs[0]);
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

        Sequelize
            .query('EXEC GetRoleById :id',
                { replacements: replacements1 })
            .then(queryReturn);

        function queryReturn(recs) {
            res.send(recs[0][0]);
        };
    }
};

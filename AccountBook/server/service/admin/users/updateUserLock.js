'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.index = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var replacements1 = req.body;
        replacements1.updateBy = '';
        Sequelize
            .query('EXEC UpdateUserLock :id,:isLocked, :updateBy',
                { replacements: replacements1 })
            .then(queryReturn);

        function queryReturn(recs) {
            res.send(JSON.stringify("User lock updated successfully"));
        };
    }
};
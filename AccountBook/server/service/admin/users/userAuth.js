'use strict'

var Sequelize = require('../../../config/sequelize').getConnection();
var tokenVerify = require('../../../config/tokenverify');

exports.authenticate = function (email, password, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        var replacements1 = {
            'email': email
        }
        //fetch user and verify
        Sequelize.query('EXEC Master_UserStatus :email', { replacements: replacements1 }).then(queryReturn);

        function queryReturn(recs) {
            console.log(recs[0][0]);
            res = recs[0];
        }
    }
}
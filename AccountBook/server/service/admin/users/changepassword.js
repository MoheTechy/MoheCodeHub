'use strict';
var Sequelize = require('../../../config/sequelize').getConnection();
var passport = require('../../../config/passport');
var bcrypt = require('bcrypt');
var tokenVerify = require('../../../config/tokenverify');

function verify(hash, pwd) {
    var result = bcrypt.compareSync(pwd, hash); // true
    console.log(result);
    return result;
}

exports.index = function (req, response) {


        var replacements1 = req.body;
        var replacements = {
            emailId: replacements1.emailId
        };

        Sequelize
            .query('EXEC LoginByEmailId :emailId', { replacements: replacements1 })
            .then(function (res, err) {
                if (err) {
                    console.log(err);
                }
                if (res[0][0]) {
                    var hashed = res[0][0].password;
                    var result = verify(hashed, replacements1.password);
                    if (result == true) {

                        var passwordData = passport.saltHashPassword(replacements1.newPassword);

                        var replacementData = {
                            password: passwordData.passwordHash,
                            salt: passwordData.salt,
                            emailId: replacements1.emailId,
                            updatedBy: ''
                        }

                        Sequelize
                            .query('EXEC ChangePassword :emailId, :password, :salt, :updatedBy',
                                { replacements: replacementData })
                            .then(queryReturn);

                        function queryReturn(recs) {
                            response.send(JSON.stringify("Password changed successfully"));
                        };
                    }
                }
            });
};